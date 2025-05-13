import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Success = ({display, title, message, customStyles={}}) => {

    const [timer, setTimer] = useState(10);

    const timerInterval = setInterval(() => {
        if (display === true) {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(timerInterval);
                window.location.href = "https://realitycapturenetwork.com";
            }
        }
    }, 1000);

    useEffect(() => {
        if (timer <= 0) {
            console.log("Timer should stop");
            clearInterval(timerInterval);
        }
        return () => {
            clearInterval(timerInterval);
        }
    }, [display, timer])

    return display && (
        <motion.div
            className="w-full h-full relative" 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.75}}
        >
            <div className={`absolute w-full h-full transition-all duration-500  flex flex-col items-center justify-center px-8 gap-8 z-10 ${display === true ? "visible" : "hidden"} ${customStyles} rounded-lg`}>
                <h3 className="text-4xl text-white font-bold">{title}</h3>
                <p className="text-white text-lg font-thin">{message}</p>
                <p className="text-white">This page will redirect to our website in {timer} second{timer > 1 ? "s" : ""}</p>
            </div>
        </motion.div>

    )
};


export default Success