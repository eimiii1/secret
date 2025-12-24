'use client'
import Carousel from "@/components/ui/carousel";
import Letters from "@/components/ui/letters";
import Navigation from "@/components/ui/navigation";
import { motion } from "framer-motion";

export default function Main() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      }
    }
  }
  const MotionNavigation = motion(Navigation)
  const MotionCarousel = motion(Carousel)
  const MotionLetters = motion(Letters)

  return (
    <motion.div 
    variants={container}
    initial="hidden"
    animate="show"
    className=" flex flex-col gap-20">
      <MotionNavigation
      variants={item}
      />
      <div className="flex flex-col gap-30">
        <MotionCarousel
        variants={item}
         />
        <MotionLetters 
        variants={item}
        />
      </div>
    </motion.div>
  )
}