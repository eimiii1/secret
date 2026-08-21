"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Main() {
  return (
    <div className="relative min-h-screen flex justify-evenly items-center flex-col">
      <Image src="/bg.jpg" alt="bg" fill className="object-cover -z-10" />
      <Introduction />
    </div>
  );
}

function Introduction() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-100 items-center">
      <Image src="/kuromi.gif" alt="kuromi" width={200} height={400} />
      <h1 className="flex flex-col justify-center items-center font-medium">
        <span className="text-4xl lg:text-6xl">Hello</span>
        <span className="text-4xl lg:text-6xl text-red-500">My Love!</span>
      </h1>
      <p className="text-black/60">do you want to see your gift?</p>
      <ButtonGroup router={router} />
    </div>
  );
}

function ButtonGroup({ router }) {
  const [size, setSize] = useState(16);
  return (
    <div className="flex w-full justify-center items-center gap-4">
      <Button
        variant="default"
        className={`flex-1 rounded-full`}
        style={{ padding: size }}
        onClick={() => router.push("/letters")}
      >
        YES
      </Button>
      <Button
        variant="destructive"
        className="flex-1 p-4 rounded-full"
        onTouchStart={() => setSize(size + 4)}
        onClick={() => setSize(size + 4)}
      >
        NO THANKS
      </Button>
    </div>
  );
}

export default Main;