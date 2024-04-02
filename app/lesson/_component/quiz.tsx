"use client"

import { useState, useTransition } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import { Hearder } from "./hearder";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { toast } from "sonner";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useMount } from "react-use";
import { FinishView } from "./finish-view";
import { useRouter } from "next/navigation";
import { useFinishHearts } from "@/store/use-hearts-model";
import { usePracticeModel } from "@/store/use-practice-model";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[];
    userSubscription: any // TODO:Replace with subscription DB
}


export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscription,
    initialLessonId
}: Props) => {
    const { open: openFinishHeartsModal } = useFinishHearts()
    const {open: openPracticeModal} = usePracticeModel()

    const router = useRouter()
    const [lessonId] = useState(initialLessonId)
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
    const [incorrectAudio, _inc, incorrectControls] = useAudio({ src: "/incorrect.wav" })
    const [pending, startTransition] = useTransition()
    const [hearts, setHearts] = useState(initialHearts)
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    const [percentage, setPercentage] = useState(()=>{
        return initialPercentage===100 ? 0 : initialPercentage
    })
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    })

    const [selectedOption, setSelectedOption] = useState<number>()

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }
    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id)
    }
    const onContinue = () => {
        if (!selectedOption) return;
        if (status === "wrong") {
            setStatus("none")
            setSelectedOption(undefined)
            return;
        }
        if (status === "correct") {
            onNext();
            setStatus("none")
            setSelectedOption(undefined)
            return;
        }

        const correctOption = options.find((option) => option.correct)

        if (!correctOption) {
            return;
        }
        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        
                        if (response?.error === "hearts") {
                            openFinishHeartsModal()
                            return;
                        }

                        correctControls.play()
                        setStatus("correct")
                        setPercentage((prev) => prev + 100 / challenges.length)

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5))
                        }

                    }).catch((error) => toast.error("Something went wrong. Please try again"))

            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error==="hearts") {
                            openFinishHeartsModal()
                            return
                        }
                        incorrectControls.play();
                        setStatus("wrong");
                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0))
                        }
                    }).catch((error) => toast.error("Something Went Wrong please try again   "))
            })
        }


    }
    useMount(() =>{
        if (initialPercentage === 100) {
            openPracticeModal()
        }
    })

    if (!challenge) {
        return (
            <>
                <FinishView hearts={hearts} challenges={challenges} />
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        )
    }
    const title = challenge.type === "ASSIST"
        ? "Selectionner la correct signification" : challenge.question
    return (
        <>
                {incorrectAudio}
                {correctAudio}
            <div className=" h-full">
                <Hearder
                    hearts={hearts}
                    percentage={percentage}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                <div className=" flex-1">
                    <div className=" h-full flex items-center justify-center">
                        <div className=" py-5 lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12 ">
                            <h1 className=" text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                                {title}
                            </h1>
                            <div>
                                {challenge.type === "ASSIST" && (
                                    <QuestionBubble question={challenge.question} />
                                )}
                                <Challenge
                                    options={options}
                                    onSelect={onSelect}
                                    status={status}
                                    selectedOption={selectedOption}
                                    disabled={pending}
                                    type={challenge.type}

                                />
                            </div>
                        </div>

                    </div>
                </div>
                <Footer
                    disabled={pending || !selectedOption}
                    status={status}
                    onCheck={onContinue}
                />
            </div>
        </>
    )
}