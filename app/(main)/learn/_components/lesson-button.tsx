"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/click-out-side";
import { useRouter } from "next/navigation";

type Props = {
    id: number;
    index: number;
    title: string;
    description: string;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export const LessonButton = ({
    id,
    index,
    totalCount,
    title,
    description,
    locked,
    current,
    percentage }: Props) => {
    const router = useRouter()
    const [showStart, setShowStart] = useState(false)
    const ref = useOutsideClick(() => {
        setShowStart(false)
      });
    const cycleLength = 8
    const cycleIndex = index % cycleLength

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 6 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8
    }

    const rightPosition = indentationLevel * 40;

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked

    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    return (
        <div
          
        >
            <div
                className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: 24,
                }}
            >
                {
                    current ? (
                        <div  ref={ref} className="h-[102px] w-[102px] relative">
                            {!showStart && <div className=" absolute -top-6 -left-6 px-3 py-2.5
                            font-bold uppercase text-green-500 bg-white 
                            rounded-xl border-2 border-b-4 animate-bounce tracking-wide z-10 ">
                                Commencer
                                <div className=" absolute left-1/2 -bottom-2
                                 w-3 h-3 border-r-4 border-b-4 bg-white transform  rotate-45
                                "/>
                            </div>}
                            <CircularProgressbarWithChildren

                                value={Number.isNaN(percentage) ? 0 : percentage}
                                styles={{
                                    path: {
                                        stroke: "#4ade80"
                                    },
                                    trail: {
                                        stroke: "#e5e7eb"
                                    }
                                }}
                            >
                                <Button
                                    size={"rounded"}
                                    variant={locked ? "locked" : "secondary"}
                                    className="h-[70px] w-[70px] border-b-8"
                                    onClick={() => setShowStart(!showStart)}
                                >
                                    <Icon
                                        className={cn("h-10 w-10",
                                            locked ?
                                                " fill-neutral-400 text-neutral-400 stroke-neutral-400 "
                                                : " fill-primary-foreground text-primary-foreground ",
                                            isCompleted && "fill-none stroke-[4]"
                                        )}
                                    />
                                </Button>
                            </CircularProgressbarWithChildren>
                            {showStart && <div style={{
                                pointerEvents: locked ? "none" : "auto"
                            }} className="transform transition duration-500 ease-in-out  absolute  -left-[83%]    px-3 py-2.5
                                    font-bold  text-white bg-green-500 
                                    rounded-xl w-64 tracking-wide z-10 ">
                                <div className="">
                                    <div className=" mb-5 space-y-1">
                                        <p className="text-sm">{description}</p>
                                        <p className=" font-normal">
                                            Vous avez couvert {percentage}% de votre leçon
                                        </p>
                                    </div>
                                    <Link
                                        href={href}
                                        aria-disabled={locked}>
                                        <Button variant={locked ? "locked" : "secondary"} className=" border border-b-4 bg-white text-green-500 w-full hover:text-white">
                                           {percentage > 0 ? "Continuer" :"Commencer"} 
                                        </Button>
                                    </Link>
                                </div>
                                <div className=" absolute left-1/2 -top-1
                                        w-3 h-3  bg-green-500 transform  rotate-45
                                        "/>
                            </div>}
                        </div>
                    ) : (
                        <div ref={ref} className=" relative">
                            
                            <Button
                                size={"rounded"}
                                onClick={() => setShowStart(!showStart)}
                                variant={locked ? "locked" : "secondary"}
                                className="h-[70px] w-[70px] border-b-8 active:border-b-2"
                            >
                                <Icon
                                    className={cn("h-10 w-10",
                                        locked ?
                                            " fill-neutral-400 text-neutral-400 stroke-neutral-400 "
                                            : " fill-primary-foreground text-primary-foreground ",
                                        isCompleted && "fill-none stroke-[4]"
                                    )}
                                />
                            </Button>
                            {showStart && 
                            <div 
                            className={
                            cn(`absolute  w-64 z-20 rounded-lg bg-green-500 p-4 shadow-lg transition duration-150 ease-in-out `,
                            locked && " bg-gray-100 border-2 text-black text-opacity-30 "
                            , !locked && " text-white")}>
                                {locked ? <div className="">
                                    <div className=" mb-5 space-y-1">
                                        <p className="text-normal font-black">{description}</p>
                                        <p className="">
                                            Termine tous les niveaux précédents pour débloquer celui-ci !
                                        </p>
                                    </div>
                                   <div className=" text-center text-normal w-full bg-gray-200 p-2 rounded-lg">
                                    PAS ENCORE DEBLOQUE
                                   </div>
                                </div>:<div className="">
                                    <div className=" mb-5 space-y-1">
                                        <p className="text-normal font-black">{description}</p>
                                        <p className="">
                                        Montre ce dont tu es capable avec le Défi Légendaire
                                        </p>
                                    </div>
                                   <Button onClick={()=> router.push(`/lesson/${id}`)  }  variant={"primary"} className=" w-full">
                                        S'entraîner +5 XP
                                   </Button>
                                   
                                </div>}
                                <div className={cn(`absolute left-6 -top-2 w-3 h-3  bg-gray-100 border-l-4 border-t-4 transform  rotate-45`, !locked && " bg-green-500 -top-1 border-green-500")}/>
                            </div>}
                        </div>
                    )
                }
            </div>
        </div>
    )
}