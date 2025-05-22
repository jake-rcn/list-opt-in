import { useSelector } from "react-redux"
import { useState } from "react";
import { motion } from "motion/react";
import { LuArrowLeft } from "react-icons/lu";


import ConfirmationModal from "../components/unSubscribeForm/confirmationModal/ConfirmationModal";
import UnSubscribeForm from "../components/unSubscribeForm/UnSubscribeForm";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";

const UnSubscribe = () => {

    const [showModal, setShowModal] = useState(false);

    const email = useSelector(state => state.form.email);

    const handleModalShow = () => {
        if (email !== "") {
            setShowModal(true);
        }
    }

    const modal = showModal && (
        <ConfirmationModal closeModal={() => setShowModal(false)} />
    )

    return (
        <div className="flex flex-col items-center justify-center w-3/4 md:w-1/2 gap-2 z-10">
            {modal}
            <Header showText={false}/>
            <motion.div 
                className="flex flex-row items-end justify-between w-full"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.5}}
            >
                <h1 className="text-white text-left text-3xl font-bold">Unsubscribe</h1>
                <Link to={"/"} className="py-1 px-4 rounded-lg bg-white/10 flex flex-row items-center gap-1 transition-all duration-300 hover:scale-105">
                    <LuArrowLeft className="" size={20} />
                    <p className="">Back</p>
                </Link>
            </motion.div>
            <UnSubscribeForm  toggleModal={handleModalShow}/>
        </div>                                                                                   
    )
}

export default UnSubscribe