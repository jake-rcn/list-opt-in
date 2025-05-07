
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

import Checkbox from './components/Checkbox';
import Spokes from './components/loaders/spokes';
import Success from './components/formMessages/success.js';
import UserEmail from './components/formComponents/UserEmail.js';

import contactUpdate from './api/contactUpdate.ts';

function App() {

  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [recapChecked, setRecapChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [eventsChecked, setEventsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("")

  const checkboxHandler = (label) => {
    const checkboxCypher = {
      "Newsletter": {val: newsletterChecked, changeFunc: setNewsletterChecked},
      "Re/Cap": {val: recapChecked, changeFunc: setRecapChecked},
      "All of the above": {val: allChecked, changeFunc: setAllChecked},
      "Events": {val: eventsChecked, changeFunc: setEventsChecked},
    }
    let activeCheckbox = checkboxCypher[label];
    const {val, changeFunc} = activeCheckbox;
    if (label === "Re/Cap") {
      setAllChecked(false);
    } else if (label === "Newsletter") {
      setAllChecked(false);
    } else if (label === "Events") {
      setAllChecked(false);
    } else if (label === "All of the above") {
      setEventsChecked(false);
      setRecapChecked(false);
      setNewsletterChecked(false);
    }
    changeFunc(!val);
  }

  const getEmailParam = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) {
      console.log(emailParam);
      setEmail(emailParam)
    }
  }


  const handleFormSubmit = async (e) => {
    setFormError("");
    console.log("Form Submitted !");
    setLoading(true);
    const checkboxData = {
      newsletter: allChecked === true ? true : newsletterChecked,
      recap: allChecked === true ? true : recapChecked,
      events: allChecked === true ? true : eventsChecked
    }
    const emailParam = await getEmailParam();
    if (emailParam !== false) {
      const configuredPayload = {
        email: emailParam,
        lists: checkboxData
      }
      const updated = await contactUpdate(configuredPayload);
      const {success} = updated;
      if (success === true) {
        setShowSuccess(true);
      } else {
        const {message} = updated
        setFormError(message);
        setShowError(true);  
      }
      setLoading(false);
    }
  }

  const renderCheckboxes = () => {
    const checkboxes = [
      {label: "Newsletter", description: "This includes our weekly newsletter, events, and podcast updates.", checked: newsletterChecked},
      {label: "Re/Cap", description: "This includes our weekly Re/Cap. It goes over innovations in the built world in a casual, humored, technical way and we highlight a historical error that could have been avoided or fixed with current technology.", checked: recapChecked},
      {label: "Events", description: "Stay in the loop for all our events and updates to the events.", checked: eventsChecked},
      {label: "All of the above", description: "", checked: allChecked},
    ];
    return checkboxes.map((info, i) => <Checkbox handleClick={checkboxHandler} key={`${i}-${info.label}`} info={info} />)
  }

  const presentButtonText = () => {
    return loading === true ?
      <Spokes />
    : 
    (
      "Submit"
    )
  }

  const displayError = () => {
    return showError === true && <small className="text-red-500 font-sans-serif font-bold text-left">{formError}</small>
  }

  const getUserEmail = () => {

  }

  useEffect(() => {
    getUserEmail();
  })

  return (
    <motion.div layout className="text-white w-full md:h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-cloudline to-deep-wave z-0 transition-all duration-300">
      <img src="/logo-white.png" className="w-60 h-auto object-fill z-10 mb-4" />
      <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
        <h2 className="text-3xl font-bold self-start">Let's Stay Connected</h2>
        <p className="">We're updating our email list and want to make sure you're only getting the information you care about. Use the form below to let us know what topics you're interested in—like our newsletter, re/cap, or if you want all the updates. This helps us send you relevant content and cut down on the noise. Thanks for staying connected!</p>
        {displayError()}
        <form action={handleFormSubmit} className="w-full relative" >
          <Success display={showSuccess} />
          <div className="w-full bg-white/10 p-4 flex flex-col gap-4 rounded-lg">
            {/* USER EMAIL */}
            <UserEmail />
            <h4 className="">Check the box for the lists you'd like to join!</h4>
            <div className="flex flex-col gap-2">
              {renderCheckboxes()}
            </div>
            <button type="submit" className="bg-white/70 rounded w-full transition-all duration-300 hover:bg-white text-xl font-bold flex items-center justify-center text-rcn-blue py-1">{presentButtonText()}</button>
          </div>
        </form>
        <small className="font-thin">Or if you'd like to unsubscribe <a href="/" className="text-black font-bold hover:text-gray-800">click here</a></small>
      </div>
    </motion.div>
  );
}

export default App;
