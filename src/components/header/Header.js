import { motion } from "motion/react";

const Header = ({showText=true}) => {

    return (
        <div className="flex flex-col items-center">
            <motion.img src="/logo-white.png" className="w-60 h-auto object-fill z-10 mb-4" 
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.1, duration: 0.5}}
            />
            {showText &&
                <motion.div className="flex flex-col w-full"
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.25, duration: 0.5}}
                >
                    <h2 className="text-3xl font-bold self-start">Let's Stay Connected</h2>
                    <p className="">We're updating our email list and want to make sure you're only getting the information you care about. Use the form below to let us know what topics you're interested in—like our newsletter, re/cap, or if you want all the updates. This helps us send you relevant content and cut down on the noise. Thanks for staying connected!</p>
                </motion.div>
            }
        </div>
    )
}

export default Header;