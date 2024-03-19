import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-10">
      <div className=" flex-col flex space-y-3 text-green-300">
        <Button>Default</Button>
        <Button variant={"primary"}>Primary Outline</Button>
        <Button variant={"primary_outline"}>Primary Outline</Button>
        <Button variant={"secondary"}>Secandary</Button>
        <Button variant={"secondary_outline"}>Secandary Outline</Button>
        <Button variant={"danger"}>danger</Button>
        <Button variant={"danger_outline"}>danger Outline</Button>
        <Button variant={"super"}>Super</Button>
        <Button variant={"super_outline"}>Super Outline</Button>
        <Button variant={"ghost"}>ghost</Button>
        <Button variant={"super"}>Sidebar</Button>
        <Button variant={"super_outline"}>Sidebar Outline</Button>
      </div>
    </div>
  );
}
