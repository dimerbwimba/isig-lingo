import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./_components/items";

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    const [
        userProgress
    ] = await Promise.all([
        userProgressData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }
    return ( 
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className=" w-full flex flex-col items-center">
                
                    <div className=" w-full space-y-2 bg-gradient-to-r from-slate-700 to-green-700 p-4 rounded-xl">
                        <div className="w-2/3">
                            
                            <div className=" mt-5 text-white text-lg space-y-3">
                                <div className=" text-2xl font-bold">
                                    Abonnés toi sur Super lingo !
                                </div>
                               
                                <div>
                                    <p className=" font-semibold ">Apprends avec tes proches et faites des économies sur <span className=" font-bold">Super lingo</span> </p>
                                </div>
                                <div>
                                <Button size={"lg"} variant={"secondary"} className=" font-bold w-full">
                                    {"En Savoir Plus"}
                                </Button>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                   <Image
                    src={"/shop.svg"}
                    alt="Shop"
                    height={90}
                    width={90}
                   />
                   
                </div>
                <div>
                    <h1 className=" mb-3 text-muted-foreground font-extrabold text-2xl">Vies</h1>
                    <Items
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={false}
                    />
                </div>
            </FeedWrapper>
        </div>
     );
}
 
export default ShopPage;