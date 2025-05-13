import { motion } from "motion/react";

import UserEmail from "../formComponents/UserEmail";


const UnSubscribeForm = ({toggleModal}) => {
    return (
        <motion.div className="w-full bg-white/10 p-4 flex flex-col gap-4 rounded-lg relative"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5, duration: 0.5}}
            >
            <form action={toggleModal} className="w-full ">
                <UserEmail />
            </form>
        </motion.div>
    )
};

export default UnSubscribeForm;