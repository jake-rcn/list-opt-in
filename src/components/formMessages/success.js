import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = ({display}) => {

    const [timer, setTimer] = useState(10);
    const navigate = useNavigate()


    const timerInterval = setInterval(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            clearInterval(timerInterval);
            window.location.href = "https://realitycapturenetwork.com";
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.75}}
        >
            <div className={`absolute w-full h-full transition-all duration-500 bg-rcn-blue flex flex-col items-center justify-center px-8 gap-8 z-10 ${display === true ? "visible" : "hidden"} rounded-lg`}>
                <h3 className="text-4xl text-white font-bold">Thank You!</h3>
                <p className="text-white text-lg font-thin">Thank you for taking the time to select the list(s) that you would like to receive emails for. Look out for a confirmation email. We appreciate you being a part of our community!</p>
                <p className="text-white">This page will redirect to our website in {timer} second{timer > 1 ? "s" : ""}</p>
            </div>
        </motion.div>

    )
};


export default Success