import axios from "axios";
import sparkMd5 from "spark-md5";


interface CheckboxData {
    newsletter: boolean,
    recap: boolean,
    events: boolean
}

interface User {
    email: string,
    lists: CheckboxData
}

const getSubscriberHash = (email:string) => {
    const trimmed = email.toLowerCase().trim();
    return sparkMd5.hash(trimmed);
}

const configureTags = async (checkboxData: CheckboxData) : Promise<String[]> => {
    console.log("Check box data in configure tags", checkboxData)
    let keys = Object.keys(checkboxData);
    var tags: String[] = [];
    keys.forEach(key => {
        if (checkboxData[key] === true) {
            tags.push(key.toString())
        }
    })
    return tags;
}

const contactUpdate = async (userInfo: User) : Promise<{success: boolean,  message?: string}> => {

    const {email, lists} = userInfo;
    const tags = await configureTags(lists)
    try {
        // send data to backend
        const userData = {
            email,
            tags
        }

        const url = `http://localhost:3000/update-preferences`;
        const response = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
            return {
                success: true,
            }
        } else {
            throw Error(response.data.error)
        }
    } catch (error) {
        // send back boolean and errorMessage from server
        let data = {
            success: false,
            message: error
        }
        return data;
    }
}

export default contactUpdate;