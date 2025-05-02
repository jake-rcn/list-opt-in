import axios from "axios";
import sparkMd5 from "spark-md5";


interface CheckboxData {
    newsletter: boolean,
    recap: boolean,
    events: boolean
}

interface User {
    email: string,
    checkboxData: CheckboxData
}

const apiKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
const listId = process.env.MAILCHIMP_LIST_ID;

const getSubscriberHash = (email:string) => {
    const trimmed = email.toLowerCase().trim();
    return sparkMd5.hash(trimmed);
}

const configureTags = async (checkboxData: CheckboxData) : Promise<String[]> => {
    let keys = Object.keys(checkboxData);
    var tags: String[] = [];
    keys.forEach(key => {
        if (checkboxData[key] === true) {
            tags.push(key.toString())
        }
    })
    return tags;
}

const contactUpdate = async (userInfo: User) : Promise<Boolean> => {

    const {email, checkboxData} = userInfo;

    const subscriberHash = getSubscriberHash(email);
    const tags = await configureTags(checkboxData)
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