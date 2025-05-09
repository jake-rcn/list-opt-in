import { useState, useEffect } from "react";
import { LuDelete } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";

import { updateEmail } from "../../store/slices/formSlice";

const UserEmail = () => {

    const email = useSelector((state) => state.form.email);
    const pageLoaded = useSelector((state) => state.form.pageLoaded)
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false);

    const emailChange = (chars) => {
        dispatch(updateEmail({emailText: chars}));  
    }

    const renderEmail = () => {

        if (editing) {
            return (
                <motion.div className="w-1/2 rounded bg-white flex flex-row justify-between items-center px-2"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1}}
                >
                    <input type="email" value={email} className="text-obsidian w-3/4" onChange={(e) => emailChange(e.target.value)} />
                    {email !== "" && 
                        <LuDelete onClick={() => emailChange("")} size={20} color={"#212120"} className="hover:cursor-pointer hover:opacity-70 active:opacity-100" />
                    }
                </motion.div>
            )
        } else {
            return (
                <motion.div className="flex flex-row justify-start gap-8 items-end "
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.1}}
                >
                    <p className="text-sm">{email}</p>
                    <div onClick={() => setEditing(true)} className="text-deep-wave font-bold hover:cursor-pointer hover:text-blue-800 transition-all duration-300 text-xs">Not you? Change</div>
                </motion.div>
            )
        }
    }

    const getEmailParam = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailParam = searchParams.get('email');
        if (emailParam) {
          console.log(emailParam);
          dispatch(updateEmail({emailText: emailParam}));
        } else {
            setEditing(true);
        }
      }

    useEffect(() => {
        if (pageLoaded === false) {
            console.log("Log before get email param call")
            getEmailParam();
        }
    }, [pageLoaded])

    return (
        <div className="flex flex-col">
            <motion.p className="font-bold"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1}}
            >
                Email
            </motion.p>
            {renderEmail()}
        </div>
    )

}

export default UserEmail