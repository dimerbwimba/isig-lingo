import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

const MobileSideBar = () => {
    return ( 
        <Sheet>
            <SheetTrigger>
                <Menu className=" w-5 h-5 text-white"/>
            </SheetTrigger>
            <SheetContent className=" p-0 z-[100]" side={"left"}>
                <Sidebar/>
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileSideBar;