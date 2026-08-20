'use client'
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
  return (
    <div className="relative min-h-screen flex justify-center items-center flex-col">
      <Image src="/bg.jpg" alt="bg" fill className="object-cover -z-10" />
      <Container />
    </div>
  );  
}

function Container() {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center px-4 py-12 flex-col">
      <div className="relative bg-[#fffef5] w-full max-w-lg rounded-sm shadow-2xl px-10 py-12"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #d4c9b0 31px, #d4c9b0 32px)`,
          boxShadow: '4px 4px 0 #d4c9b0, 8px 8px 0 #e8e0cc'
        }}
      >
        {/* red margin line */}
        <div className="absolute top-0 bottom-0 left-16 w-px bg-red-300/60" />

        <div className="relative pl-6">
          <p className="text-sm text-gray-400 mb-6">Dear Mahal,</p>
          <p className="text-gray-700 leading-8 text-sm">
            {/* put your letter here */}
            I know this is beri beri beri random but I'd just like you to know that I love you so much. I just know that each day, my heart is growing more and more fond for you. I may not always say it out loud, but I hope this is enough to show you how much you mean to me. You make everything feel better, and I'm really grateful that I get to call you mine. I don't really know how to put everything into words, but I'm still trying — and I'll keep trying, for you. I'm also really proud of you, more than you probably know. Ayun lang mahal, I love you hihi.
          </p>
          <p className="text-sm text-gray-400 mt-8 text-right">With love, Philip 🤍</p>
        </div>
      </div>
      <div className="p-4 flex w-full relative">
        <Button 
        variant="destructive" 
        className='absolute right-0 w-50'
        onClick={() => router.push('/home')}
        >
          <MoveRight />
        </Button>
      </div>
    </div>
  );
}

export default Page;