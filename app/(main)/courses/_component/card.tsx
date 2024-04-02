"use client"

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props ={
    title:string;
    id:number;
    imageSrc:string;
    onClick :(id:number) => void;
    disabled?:boolean;
    active?:boolean;
}
export const Card=({title, id, imageSrc, onClick, disabled, active}:Props)=>{
    return (
        <div onClick={()=> onClick(id)} className={cn(
            "h-full border-2 relative rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[117px] min-w-[100px] ",
            disabled && " pointer-events-none opacity-50"
            )} >
            <div className=" absolute min-[24px]  right-4 w-full flex items-center justify-end ">
                {
                    active && (
                        <div className=" flex items-center p-1.5 justify-center rounded-md bg-green-600">
                            <Check className=" text-white stroke-[4] w-4 h-4"/>
                        </div>
                    )
                }
            </div>
            <Image src={imageSrc}  alt={title} height={50} width={73.33}
            className=" rounded-lg drop-shadow-md border object-cover" />
            <p className=" text-slate-600 text-center font-bold mt-3">
                {title}
            </p>
            <p className="sm text-slate-400">
                120 membres
            </p>
        </div>
    )
}