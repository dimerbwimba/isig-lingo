import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

type Props={
    title:string;
    description:string;
}

export const UnitBanner = ({title, description}:Props)=>{
    return (
        <div className=" w-full rounded-xl bg-green-500 p-5
         text-white items-center justify-between">
            <div className=" space-y-2.5">
                <div className=" flex items-center justify-between text">
                    <div>
                        <div className=" flex items-center space-x-4 ">
                         <ArrowLeftCircle className=" w-5 h-5 opacity-70"/>
                         <h1 className=" text-lg  uppercase font-bold opacity-70">Chapter 1, {title}</h1>
                        </div>
                        <p className=" text-xl font-bold">{description}</p>
                    </div>
                    <Button variant={"secondary"} className="flex justify-center border-2 border-b-4 active:border-b-2 ">
                        <Image src={"/notebook.svg"} alt={title} className="mr-1" height={22} width={22} />
                        <span className=" font-bold">
                            GUIDE
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}