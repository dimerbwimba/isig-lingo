"use client"

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINT_TO_REFILL } from "@/constants/constant";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}


export const Items = ({
    hasActiveSubscription, hearts, points
}: Props) => {
    const [pending, startTransition] = useTransition();
    const onRefillHearts = () =>{
        if (pending || hearts === 5 || points < POINT_TO_REFILL) {
            return
        }
        startTransition(()=>{
            refillHearts()
                .catch(()=> toast.error("Something went wrong please try again later"))
        })
    }
    const onSubscribe = () =>{
        startTransition(()=>{
            createStripeUrl()
                .then((response)=>{
                    if (response.data) {
                        window.location.href = response.data
                    }
                })
                .catch(()=> toast.error("Something went wrong on send payment"))
        })
    }
    return (
        <ul className=" py-3 border-t-2 border-b-2">
            <li className=" pt-[20px] pb-[20px] min-h-[120px] relative">
                <Image
                    alt="hearts"
                    src={"/heart.svg"}
                    height={80}
                    width={80}
                    className=" inline-block float-left  mt-[-5px] mr-[10px] mb-[-20px]"
                />
                <Button onClick={onRefillHearts} className=" float-right ml-[18px] min-w-[150px] static " 
                disabled={hasActiveSubscription || pending || hearts === 5 || points < POINT_TO_REFILL }>
                    {
                        hearts === 5 ? "VIES AU MAX" : (
                            <div className=" flex items-center">
                                <p className=" font-bold text-sm">OBTENIR POUR</p>
                                <Image
                                    src={"/points.svg"}
                                    alt="points"
                                    height={26}
                                    width={26}
                                />
                                <p className=" font-bold">
                                    50
                                </p>
                            </div>
                        )
                    }
                </Button>
                <h1 className=" text-xl py-[1px] font-extrabold">Recharger mes vies</h1>
                <p className=" w-full ">
                    Recharge toutes tes vies, tu auras une plus grande marge d'erreur pendant tes leçons
                </p>
            </li>
            <li className=" border-t-2 pt-[20px] pb-[20px] min-h-[120px] relative">
                <Image
                    alt="hearts"
                    src={"/unlimited_hearts.svg"}
                    height={80}
                    width={80}
                    className=" inline-block float-left  mt-[-5px] mr-[10px] mb-[-20px]"
                />
                <Button onClick={onSubscribe} className=" text-blue-600 border-2 border-b-4 border-blue-500 float-right ml-[18px] min-w-[150px] static " 
                disabled={pending}>
                    {
                       hasActiveSubscription ? "Paramétrer" : (
                            <div className=" flex items-center">
                                <p className=" font-bold text-sm">Vies illimitées</p>
                            </div>
                        )
                    }
                </Button>
                <h1 className=" text-xl py-[1px] font-extrabold">Vies illimitées</h1>
                <p className=" w-full ">
                Ne perds plus jamais de vies avec Super lingo !
                </p>
            </li>
        </ul>
    )
}