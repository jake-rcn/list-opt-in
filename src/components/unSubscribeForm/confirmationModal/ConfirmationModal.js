import { motion } from "motion/react";
import { LuX } from "react-icons/lu";
import { useState } from "react";

import Success from "../../formMessages/success";

const ConfirmationModal = ({closeModal}) => {

    const [showSuccess, setShowSuccess] = useState(false);

    const unsubscribe = () => {
        console.log("Unsubscribe confirmed!");
        
    }

    const confirmationMessage = "You have been unsubscribed. We’ll miss you! If you change your mind, you can re-subscribe anytime."

    return (
        <motion.div 
            className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-obsidian/30 z-50"
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            >
                <form action={unsubscribe} className="w-full h-full flex items-center justify-center ">
                    {showSuccess ? 
                        <Success display={showSuccess} title="" message={confirmationMessage} customStyles={"bg-obsidian"} />
                        :
                        <motion.div 
                            className="flex flex-col items-start justify-center gap-4 rounded w-1/2 bg-obsidian py-8 px-4 relative"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: .25}}
                            >
                                <div onClick={closeModal} className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center -right-3 -top-3 opacity-80 transition-all duration-300 hover:opacity-100 hover:cursor-pointer">
                                    <LuX color={'#212120'}
                                    size={24} />
                                </div>
                                <h2 className="text-white font-bold text-3xl">Confirm</h2>
                                <p className="text-white text-lg ">
                                    Are you sure you want to unsubscribe from our emails?
                                </p>
                                <div className="w-full flex flex-row gap-4 justify-end">
                                    <button type="submit" className="rounded bg-white text-obsidian py-1 px-4 opacity-80 transition-all duration-300 hover:opacity-100">Unsubscribe</button>
                                    <button onClick={closeModal} className="rounded border-2 border-white text-white py-1 px-4 opacity-80 transition-all duration-300 hover:opacity-100">Cancel</button>
                                </div>
                        </motion.div>
                    }
                </form>
        </motion.div>
    )
}

export default ConfirmationModal;