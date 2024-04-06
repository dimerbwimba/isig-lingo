import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"

type Props = {
    title:string,
    description:string,
}

export const NextChapter=({title, description}:Props)=>{
    return (
        <div className=" my-10 text-center border-2 text-gray-400  py-10 px-32 space-y-4 rounded-2xl">
            <span className=" bg-gray-100 px-3 rounded-xl  text-[14px] font-bold">
                À SUIVRE
            </span>
            <div className=" space-x-3 text-4xl flex font-black justify-center items-center">
                <LockIcon/>
                <span>
                    {title}
                </span>
            </div>
            <p className=" text-lg">
            {description}
            </p>
            <div>
                <Button disabled className=" w-full">
                    Continuer ici
                </Button>
            </div>
        </div>
    )
}