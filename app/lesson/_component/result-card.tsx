import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    value : number;
    variant : "points" | "hearts"
}

export const ResultCard = ({variant,value}:Props) =>{
    return (
        <div className={cn(" rounded-2xl border w-full",
        variant === "points" && " bg-orange-400 mr-1 border-orange-400",
        variant === "hearts" && " bg-rose-500 ml-1 border-rose-500"
        )}>
           <div className={cn(
            "p-1.5 text-white  rounded-t-xl font-bold text-center uppercase text-xs",
            variant === "hearts" && "bg-rose-500",
            variant === "points" && " bg-orange-400"
           )}>
             {variant === "hearts" ? "coeur restants" : "XP GAGNÉS"}
           </div>
           <div className={cn(
            " rounded-2xl font-bold bg-white items-center flex  justify-center p-4",
            variant === "hearts" && " text-rose-500",
            variant === "points" && " text-orange-500"
            )}>
                { variant === "points" && <Image src={"/points.svg"} alt={"Points"} 
                    width={22} height={22} className="mr-2" />} 
                 { variant === "hearts" &&      <Image src={"/heart.svg"} alt={"hearts"} 
                    width={22} height={22} className=" mr-2" />}
                    {value}
           </div>
        </div>
    )
}