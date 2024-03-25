"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Hearder } from "./hearder";

type Props = {
     initialPercentage:number;
     initialHearts:number;
     initialLessonId:number;
     initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed:boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
     })[];
     userSubscription:any // TODO:Replace with subscription DB
}


export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscription,
    initialLessonId
}:Props) =>{

    const [hearts, setHeart] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)

    return (
        <div>
            <Hearder
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </div>
    )
}