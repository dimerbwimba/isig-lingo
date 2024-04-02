"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    label:string,
    iconSrc:string,
    href:string
}
const SidebarItem = ({ label, iconSrc, href}:Props) => {
    const pathName = usePathname()
    const active = pathName === href
    return ( 
        <Button 
            variant={active ? "sidebar_outline":"sidebar"}
            className=" justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32} />
                <span className=" font-extrabold text-md">{label}</span>
            </Link>
        </Button>
     );
}
 
export default SidebarItem;