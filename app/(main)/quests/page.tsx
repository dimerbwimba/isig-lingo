import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
// import { Promo } from "@/components/promo";
import { quests } from "@/constants/constant";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {!isPro && (""
                    //   <Promo />
                )}
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <div className=" flex w-full space-y-2 bg-gradient-to-r from-blue-700 to-green-700 p-4 rounded-xl">
                        <div className="w-2/3">

                            <div className=" my-5 text-white text-lg space-y-3">
                                <div className=" text-2xl font-bold">
                                    Gagne des récompenses grâce aux quêtes !
                                </div>

                                <div>
                                    <p className=" font-semibold ">
                                        Tu as terminé
                                        <span className=" font-bold"> 0 quête sur 3</span> aujourd'hui. </p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-1/3  flex justify-center items-center">

                            <Image
                                src="/quests.svg"
                                alt="Quests"
                                height={90}
                                width={90}
                            />
                        </div>
                    </div>
                    <div className=" mt-5 flex px-2 justify-between w-full">
                        <h1 className=" text-xl font-extrabold text-muted-foreground">Quêtes du jour</h1>
                        <h1 className=" text-xl font-extrabold text-orange-500">
                            <Timer className=" h-4 w-4 inline-flex mb-1"/>    24 heures
                        </h1>
                    </div>
                    <ul className=" p-5 border-2 w-full rounded-xl">
                        {quests.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;

                            return (
                                <div
                                    className="flex items-center w-full p-4 gap-x-4 border-b"
                                    key={quest.title}
                                >
                                    <Image
                                        src="/points.svg"
                                        alt="Points"
                                        width={60}
                                        height={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <div className="relative">
                                            <Progress value={progress} className="h-5" />
                                            <div className=" left-[45%] top-0 text-slate-200 absolute font-bold">
                                                {progress>20 ? progress : "20"}/20
                                            </div>
                                            <Image
                                                src={"/mystery_box_1.svg"}
                                                height={35}
                                                width={35}
                                                alt="mystery-box"
                                                className=" absolute -right-[1%] -top-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;