"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import { Heart, TrendingUp } from "lucide-react"
import { usePracticeModel } from "@/store/use-practice-model"

export const PracticeModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = usePracticeModel()

    useEffect(() => setIsClient(true), [])
    if (!isClient) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className=" md:w-[25rem]  max-w-md ">
                <DialogHeader>
                    <div className=" flex justify-center items-center my-2">
                        <Image
                            src={"/heart.svg"}
                            alt="mascot"
                            height={100}
                            width={100}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className=" my-3 font-bold inline-block text-center text-slate-800 text-2xl">
                    <p>Bienvenue au mode entraînement ! </p>
                </DialogTitle>
                <DialogDescription className="">
                    <div className=" space-y-2 border-2 p-2 rounded-xl">
                       
                        <div className=" text-lg">
                        Ici, vous pouvez regagner des <span className="  px-1 rounded-lg text-rose-500 underline font-bold">vies</span> perdues ou des points.

                        </div>
                        <div>
                        <Button onClick={close} size={"lg"} variant={"primary"} className=" font-bold w-full">
                            {"Continuer"}
                        </Button>
                        </div>
                    </div>
                </DialogDescription>
                <DialogFooter >
                    <div className=" space-y-2 w-full ">
                        <Button onClick={()=> router.push("/learn")} size={"lg"} variant={"danger_outline"} className=" font-bold w-full">
                            {"Nom merci"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
