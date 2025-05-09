import { useState, useEffect } from "react";
import { LuDelete } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";

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
                <div className="w-1/2 rounded bg-white flex flex-row justify-between px-2">
                    <input type="email" value={email} className="text-obsidian w-3/4" onChange={(e) => emailChange(e.target.value)} />
                    {email !== "" && 
                        <LuDelete onClick={() => emailChange("")} size={24} color={"#212120"} className="hover:cursor-pointer hover:opacity-70 active:opacity-100 z-10" />
                    }
                </div>
            )
        } else {
            return (
                <div className="flex flex-row justify-start gap-8 items-end ">
                    <p className="text-sm">{email}</p>
                    <div onClick={() => setEditing(true)} className="text-deep-wave font-bold hover:cursor-pointer hover:text-blue-800 transition-all duration-300 text-xs">Not you? Change</div>
                </div>
            )
        }
    }

    const getEmailParam = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailParam = searchParams.get('email');
        if (emailParam) {
          console.log(emailParam);
          dispatch(updateEmail({emailText: emailParam}));
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
            <p className="font-bold">Email</p>
            {renderEmail()}
        </div>
    )

}

export default UserEmail