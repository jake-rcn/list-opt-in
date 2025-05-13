import { useSelector } from "react-redux"
import { useState } from "react";

import ConfirmationModal from "../components/unSubscribeForm/confirmationModal/ConfirmationModal";

import UnSubscribeForm from "../components/unSubscribeForm/UnSubscribeForm"

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
        <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
            {modal}
            <h1 className="text-white text-3xl font-bold">Unsubscribe form</h1>
            <UnSubscribeForm  toggleModal={handleModalShow}/>
        </div>                                                                                   
    )
}

export default UnSubscribe