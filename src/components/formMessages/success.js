import { motion } from "motion/react";

const Success = ({display}) => {

    return display && (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.75}}
        >
            <div className={`absolute w-full h-full transition-all duration-500 bg-rcn-blue flex flex-col items-center justify-center px-8 gap-8 z-10 ${display === true ? "visible" : "hidden"} rounded-lg`}>
                <h3 className="text-4xl text-white font-bold">Thank You!</h3>
                <p className="text-white text-lg font-thin">Thank you for taking the time to select the list(s) that you would like to receive emails for. Look out for a confirmation email. We appreciate you being a part of our community!</p>
            </div>
        </motion.div>

    )
};


export default Success