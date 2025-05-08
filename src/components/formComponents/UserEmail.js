import { useState, useEffect } from "react";
import { LuDelete } from "react-icons/lu";

const UserEmail = ({email, changeFunc, clearInput}) => {

    const [editing, setEditing] = useState(false);
    const [pageLoaded, setPageLoading] = useState(false);

    const renderEmail = () => {
        if (editing) {
            return (
                <div className="w-1/2 rounded bg-white flex flex-row justify-between px-2">
                    <input type="email" value={email} className="text-obsidian w-3/4" onChange={(e) => changeFunc(e.target.value)} />
                    {email !== "" && 
                        <LuDelete onClick={clearInput} size={24} color={"#212120"} className="hover:cursor-pointer hover:opacity-70 active:opacity-100 z-10" />
                    }
                </div>
            )
        } else {
            return (
                <div className="w-1/2 flex flex-row justify-start gap-8 items-end ">
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
          changeFunc(emailParam)
        }
      }

    useEffect(() => {
        if (pageLoaded === false) {
            getEmailParam();
        }
    }, [pageLoaded])

    return (
        <div className="flex flex-col">
            <p className="">Email</p>
            {renderEmail()}
        </div>
    )

}

export default UserEmail