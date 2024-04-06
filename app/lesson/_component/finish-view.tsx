import Image from "next/image"
import { ResultCard } from "./result-card"
import { challenges } from "@/db/schema"
import { Firework } from "./firework";
import { InfinityIcon } from "lucide-react";

type Props ={
    challenges: typeof challenges.$inferSelect[];
    hearts:number;
    isPro:boolean
}

export const FinishView= ({challenges,hearts, isPro}:Props)=>{
    return (
        
        <div className=" flex flex-col gap-y-4 max-w-lg mx-auto text-center items-center justify-center h-full">
                <Firework/>
                <div>
                    <h1 className=" text-3xl mb-0 font-bold  text-green-500">
                        Bon travail !
                    </h1>
                    <h2 className=" text-xl font-bold text-slate-500">
                    Vous avez terminé votre leçon
                    </h2>
                </div>

                <div className=" flex w-full">
                    <ResultCard
                        variant="points"
                        value={challenges.length * 10}                    
                    />
                    <ResultCard
                        variant="hearts"
                        value={isPro ? <InfinityIcon className=" w-7 h-7 stroke-[3]"/> : hearts}                    
                    />
                </div>
             </div>
    )
}