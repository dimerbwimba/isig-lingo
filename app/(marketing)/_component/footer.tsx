import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
    return ( 
        <div className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className=" max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size={"lg"} variant={"ghost"} className="w-full" >
                    <Image className=" rounded-md mr-4"  alt="hungry" height={32} width={40} src={"/hr.svg"}/>
                    Hungary
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full" >
                    <Image className=" rounded-md mr-4" alt="japan" height={32} width={40} src={"/jp.svg"}/>
                    Japan
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full" >
                    <Image className=" rounded-md mr-4" alt="italian" height={32} width={40} src={"/it.svg"}/>
                    Italy
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full" >
                    <Image className=" rounded-md mr-4" alt="french" height={32} width={40} src={"/fr.svg"}/>
                    France
                </Button>
                <Button size={"lg"} variant={"ghost"} className="w-full" >
                    <Image className=" rounded-md mr-4" alt="spain" height={32} width={40} src={"/es.svg"}/>
                    Spain
                </Button>
            </div>
        </div>
     );
}
 
export default Footer;