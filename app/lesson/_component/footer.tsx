
import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none" | "completed";
    disabled?: boolean;
    lessonId?: boolean;
}

export const Footer = ({
    onCheck,
    status,
    disabled,
    lessonId
}: Props) => {
    useKey("Enter", onCheck, {}, [onCheck])
    const isMobile = useMedia("max-width:1024px")
    return (
        <footer className={cn(" lg:-h-[140px] h-[100px] border-t-2"
            , status === "correct" && " border-transparent bg-green-200"
            , status === "wrong" && " border-transparent bg-rose-100")}>
            <div className=" max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10 ">

                {status === "correct" && (<div className=" inline-flex text-green-500 font-bold text-base lg:text-5xl fle items-center">
                    <div className=" rounded-full bg-white mr-4 p-2">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10" />
                    </div>
                    Génial !
                </div>)}
                {status === "wrong" && (<div className=" inline-flex text-rose-500 font-bold text-base  fle items-center">
                    <div className=" lg:text-5xl rounded-full bg-white mr-4 p-2">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10" />
                    </div>
                    <div>
                       <h1 className=" text-2xl">La bonne réponse est :</h1> 
                        <p>blababa</p>
                    </div>
                </div>)}

                {status === "completed" && (
                    <Button 
                        variant={"default"} 
                        size={isMobile ? "sm":"lg"} 
                        onClick={()=> window.location.href+`/lesson/${lessonId}`}
                    >
                        Continuer la pratique
                    </Button>
                )}

                <Button
                    disabled={disabled}
                    className="ml-auto"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                >
                    {status === "none" && "Valider"}
                    {status === "correct" && "Continuer"}
                    {status === "completed" && "Continuer"}
                    {status === "wrong" && "Retry"}
                </Button>
            </div>
        </footer>
    )
}