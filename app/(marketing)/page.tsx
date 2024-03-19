import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className=" relative w-[240px] h-[240px] 
            lg:w-[400px] lg:h-[400px] mb-6 lg:mb-0">
        <Image src={"/hero.svg"} fill alt="ISIG LINGO" />
      </div>
      <div className=" flex flex-col items-center gap-y-8">
        <h1 className=" text-xl lg:text-3xl font-bold text-neutral-600 max-wp-[480px] text-center  ">
          Learn , practice, and <br /> master new languages  with  <br />  
          <span className=" font-extrabold text-green-600 tracking-wide ">
            ISIG LINGO
          </span>
        </h1>
      <div className=" space-y-1">
        <ClerkLoading>
          <Loader className=" h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button size={"lg"} variant={"secondary"} className=" w-full">
                Get started
              </Button>
            </SignUpButton>
            <br/>
            <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size={"lg"} variant={"primary_outline"} className=" w-full">
                  I already have an account
                </Button>
              </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button size={"lg"} variant={"secondary"} className="w-full" asChild>
              <Link href={"/learn"}>
                Continue Learning
              </Link>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
      </div>
    </div>
  );
}
