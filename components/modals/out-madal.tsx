"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useOutModal } from "@/store/user-out-model"
import Image from "next/image"

export const OutModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useOutModal()
    useEffect(() => setIsClient(true), [])
    if (!isClient) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className=" md:w-[22rem]  max-w-md ">
                <DialogHeader>
                    <div className=" flex justify-center items-center my-2">
                        <Image
                            src={"/mascot_sad.svg"}
                            alt="mascot"
                            height={100}
                            width={100}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className=" my-3 font-bold text-center text-slate-800 text-2xl">
                    Attends, ne pars pas ! Si tu arrêtes maintenant, tu vas perdre ta progression.
                </DialogTitle>
                <DialogFooter >
                    <div className=" space-y-2">
                        <Button onClick={close} size={"lg"} variant={"primary"} className=" font-bold w-full">
                            {"continue d\'apprendre"}
                        </Button>
                        <Button onClick={()=>{router.push("/learn");close()}} size={"lg"} variant={"danger_outline"} className=" font-bold w-full">
                            Arrêter ma session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
