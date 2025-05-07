import { useState } from "react"

const UserEmail = ({email, changeFunc}) => {

    const [editing, setEditing] = useState(false);

    return (
        <div className="flex flex-col">
            <p className="">Email</p>
        </div>
    )

}

export default UserEmail