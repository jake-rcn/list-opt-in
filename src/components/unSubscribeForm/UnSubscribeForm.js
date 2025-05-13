import { motion } from "motion/react";
import { useSelector } from "react-redux";

import UserEmail from "../formComponents/UserEmail";


const UnSubscribeForm = ({toggleModal}) => {

    const email = useSelector(state => state.form.email);

    const emailVerified = () => {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        return emailRegex.test(email);
    }

    return (
        <motion.div className="w-full bg-white/10 p-4 flex flex-col gap-4 rounded-lg relative overflow-hidden"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5, duration: 0.5}}
            >
            <form action={toggleModal} className="w-full flex flex-col gap-4 ">
                <UserEmail />
                <motion.button
                    type={'submit'}
                    className={`w-full rounded bg-white text-rcn-blue py-1 font-bold ${emailVerified() ? 'bg-opacity-100': "bg-opacity-20"} transiton-all duration-300`}
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.25}}
                >
                    Unsubscribe
                </motion.button>
            </form>
        </motion.div>
    )
};

export default UnSubscribeForm;