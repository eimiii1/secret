import { forwardRef } from "react";
import { Badge } from "./badge"
import { motion } from "framer-motion"

const Letters = forwardRef(function Letters(props, ref) {
    const letters = {
        badges: [
            { item: "love", color: "bg-pink-400" },
            { item: "health", color: "bg-orange-300" },
            { item: "career", color: "bg-purple-400" },
            { item: "for u", color: "bg-blue-300" }
        ],
        messages: [
            {
                message: "Hallo ryza mae dison, joke. This is just a reminder that not everyday is a happy day. Tandaan mo na kahit minsan hindi natin ramdam na appreciated tayo, just know that you're appreciated by me. Hindi talaga natin mapipigilan makaramdam ng ganyan, but there is always a beauty and positivity in it, hindi lang natin nakikita. Like this, tignan mo diba may mga times na nakakaramadan tayo ng ganito, maybe it's to look for ourselves kahit saglit lang kaya siguro tayo nakakaramdam ng ganito. Anyway, kung ano man yung nararamdaman mo ngayon, at kahit hindi mo sabihin, nararamdaman ko kaya remember na na-aappreciate kita and you're loved by me. :)",
                date: "December 20, 2025",
                badge: "for u",
                color: "bg-blue-300"
            },
            {
                message: "Hope you're doing well, I know what you're experiencing is hard right now, sana okay ka lang, and remember that I'm here, okay? Miss na kita but that's something you don't have to worry about. Pasensya na nung nakaraan ha, gulo gulo isip ko non e dahil sa trabaho, may naging issue kasi tas part non kasalanan ko hahahah umay pero yun lang, sana maging okay ka na and i prayed for you.",
                date: "December 24, 2025",
                badge: "for u",
                color: "bg-blue-300"
            },
            {
                message: "asd",
                date: "December 31, 2025",
                badge: "love",
                color: "bg-pink-400"
            }
        ]
    }
    return (
        <div
        ref={ref} {...props}
         className="flex flex-col gap-4">
            <header className="flex justify-center items-center flex-col">
                <h1 className="text-3xl font-bold text-primary/90">Letters</h1>
                <p className="text-primary/70 text-sm text-center">Categorized Letters.</p>
            </header>
            <div className="flex flex-col gap-4">
                <div className="flex gap-1 justify-center items-center">
                    {letters.badges.map(({ item, color }, i) => (
                        <Badge
                            className={`${color}`}
                            key={i}
                        >
                            {item}
                        </Badge>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {letters.messages.map(({ message, date, badge, color }, i) => (
                        <div
                            className="border p-5 rounded-xl flex flex-col gap-5"
                            key={i}
                        >
                            <p className="text-sm text-primary/70 h-full">
                                {message}
                            </p>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs text-primary/80">
                                    {date}
                                </span>
                                <Badge className={`${color}`}>
                                    {badge}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Letters;