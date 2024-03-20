import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SidebarItem from "@/components/sidebar-item"

type Props = {
    className?: string
}

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("flex  bg-white h-full lg:w-[256px] lg:fixed px-4 border-r-2 flex-col left-0 top-0", className)}>
            <Link href={"/learn"}>
                <div className="pt-8 pl-4 pb-7 flex  items-center gap-x-3">
                    <Image src={"/mascot.svg"} height={40} width={40} alt="ISIG LINGO" />
                    <h1 className=" text-2xl font-extrabold text-green-600 tracking-wide ">
                        ISIG LINGO
                    </h1>
                </div>
            </Link>
            <div className="flex-1 flex flex-col gap-y-2">
                <SidebarItem label="Learn" iconSrc={"/learn.svg"} href="/learn"/>
                <SidebarItem label="Leaderboard" iconSrc={"/leaderboard.svg"} href="/leaderboard"/>
                <SidebarItem label="Quests" iconSrc={"/quests.svg"} href="/quests"/>
                <SidebarItem label="Shop" iconSrc={"/shop.svg"} href="/shop"/>

            </div>
        </div>
    )
}