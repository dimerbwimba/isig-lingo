"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useFinishHearts } from "@/store/use-hearts-model"
import Image from "next/image"
import { HeartCrack, TrendingUp } from "lucide-react"

export const FinishHeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useFinishHearts()

    const onClick = () => {
        close();
        router.push("/store")
    }
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
                            src={"/mascot_bad.svg"}
                            alt="mascot"
                            height={100}
                            width={100}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className=" my-3 font-bold inline-block text-center text-slate-800 text-2xl">
                    <h1>Tu as utilisé toutes tes vies !</h1>
                </DialogTitle>
                <DialogDescription className="">
                    <div className=" space-y-2 border-2 p-2 rounded-xl">
                        <Image
                            src={"/super.svg"}
                            alt="super"
                            height={80}
                            width={80}
                        />
                        <div className=" text-lg">
                            Abonnés toi sur <span className=" bg-slate-200 px-1 rounded-lg text-orange-500 font-bold"> <TrendingUp className=" inline-flex" /> Super lingo</span> pour des vies illimités ou achetez-les dans le magasin

                        </div>
                        <div>
                        <Button onClick={onClick} size={"lg"} variant={"primary"} className=" font-bold w-full">
                            {"obtenez des VIES ILLIMITÉES"}
                        </Button>
                        </div>
                    </div>
                </DialogDescription>
                <DialogFooter >
                    <div className=" space-y-2 w-full ">
                        <Button onClick={close} size={"lg"} variant={"danger_outline"} className=" font-bold w-full">
                            {"Nom merci"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
