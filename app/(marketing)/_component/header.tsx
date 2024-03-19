import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    return ( 
        <header className=" h-20 w-full border-b-2 border-slate-200 px-4">
            <div className=" lg:max-w-screen-lg mx-auto flex items-center justify-between h-full ">
                <div className="pt-8 pl-4 pb-7 flex  items-center gap-x-3">
                    <Image src={"/mascot.svg"} height={40} width={40} alt="ISIG LINGO"/>
                    <h1 className=" text-2xl font-extrabold text-green-600 tracking-wide ">
                        ISIG LINGO
                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-4 w-4 text-muted-foreground animate-spin "/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                            <Button size={"lg"} variant={"primary"}>
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>

        </header>
     );
}
 
export default Header;