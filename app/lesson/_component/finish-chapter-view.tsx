"use client"

import Image from "next/image"
import { ResultCard } from "./result-card"
import { challenges, courses } from "@/db/schema"
import { Firework } from "./firework";
import { Check, InfinityIcon } from "lucide-react";
import { activeCourseTitleTranslate } from "@/constants/constant";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type Props ={
    hearts:number | undefined;
    points: number|undefined
    isPro:boolean
    activeCourseTitle: string|undefined
}

export const FinishChapterView= ({points,hearts, isPro, activeCourseTitle}:Props)=>{
    return (
        
        <div className=" flex flex-col gap-y-4 max-w-lg mx-auto text-center items-center  h-full">
                <Firework/>
                <div className=" bg-orange-600 p-5  rounded-2xl border w-full">
                    <h2 className=" text-white  text-2xl font-bold py-2">
                        Tu vient de finir ton chapitre
                    </h2>
                    <div>
                        <span className=" font-bold text-white">
                            {points} / {hearts} Units
                        </span>
                    </div>
                    <div className=" mb-2 flex justify-center items-center space-x-2">
                       <div className=" rounded-full bg-slate-300">
                            <Check className="  opacity-50 p-1"/>
                        </div>  
                       <div className=" text-lg font-bold text-slate-200">vous avez terminé</div>
                    </div>
                    <div className=" mb-2">
                        <p className=" text-white">
                            Continuez à exceller en {activeCourseTitleTranslate(activeCourseTitle)} <br/> dans le prochain chapitre!
                        </p>
                    </div>
                    <Button variant={"primary"} className="w-full">Continuer </Button>
                </div>
             </div>
    )
}