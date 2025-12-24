import { motion } from "framer-motion"
import { forwardRef } from "react"

const Navigation = forwardRef(function Navigation(props, ref) {
    const navigations = ["Home", "Letters", "Music", "Movies", "By. P"]

    return (
        <nav
            ref={ref} {...props}
            className="">
            <h1 className="text-sm font-semibold fixed text-primary/90">FROM PHILIP</h1>
            <div className="flex justify-center items-center flex-col gap-2 relative top-10">
                <h1 className="text-4xl font-black text-primary/80">FOR RYZA</h1>
                <ul className="flex gap-2 text-sm cursor-pointer">
                    {navigations.map((nav, i) => (
                        <li
                            className="text-primary/80"
                            key={i}
                        >
                            {nav}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
});

export default Navigation;