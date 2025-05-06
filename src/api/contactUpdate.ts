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

const apiKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
const listId = process.env.MAILCHIMP_LIST_ID;

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

const contactUpdate = async (userInfo: User) : Promise<{success: boolean,  message: string}> => {

    const {email, lists} = userInfo;
    const tags = await configureTags(lists)
    try {
        // send data to backend
        const userData = {
            email,
            tags
        }

        const url = ``;
        const response = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
            return response.data;
        } else {
            throw(Error(""))
        }
    } catch (error) {
        // send back boolean and errorMessage from server
        let data = {
            success: false,
            message: error
        }
        return data;
    }

    const subscriberHash = getSubscriberHash(email);
    console.log("checkbox data before configure tags", lists)
    try {
        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

        const subscriber = await axios.get(url, {
            headers: {
                'Authorization': `apikey ${apiKey}`
            }
        });

        console.log("Subscriber exists, updating tags...");

        const tagUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/tags`;
        const response = await axios.post(tagUrl, {
            tags: tags.map(tag => ({ name: tag, status: 'active' })),
          }, {
            headers: {
              'Authorization': `apikey ${apiKey}`,
            }
        });

        if (response.data) {
            return true;
        } 
        return false;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('Subscriber not found, creating subscriber...');
      
            // Create the subscriber and add tags
            const createUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
      
            const response = await axios.post(createUrl, {
              email_address: email,
              status: 'pending',
              tags: tags,
            }, {
              headers: {
                'Authorization': `apikey ${apiKey}`,
              }
            });
      
            if (response.data) {
                return true;
            }
            return false;

          } else {
            console.error('Mailchimp error:', error.response?.data || error.message);
            throw error;
          }
    }
}

export default contactUpdate;