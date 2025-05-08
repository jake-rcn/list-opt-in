
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

import Checkbox from './components/Checkbox';
import Spokes from './components/loaders/spokes';
import Header from './components/header/Header.js';
import OptInForm from './components/optInForm/OptInForm.js';

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
  const [email, setEmail] = useState("");
  
  const handleFormSubmit = async (e) => {
    console.log("Handle Form Submit triggered");
    setFormError("");
    console.log("Form Submitted !");
    setLoading(true);
    const checkboxData = {
      newsletter: allChecked === true ? true : newsletterChecked,
      recap: allChecked === true ? true : recapChecked,
      events: allChecked === true ? true : eventsChecked
    }
    const configuredPayload = {
      email,
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

  const displayError = () => {
    return showError === true && <small className="text-red-500 font-sans-serif font-bold text-left">{formError}</small>
  }

  const clearInput = () => {
    console.log("Clear Input triggered!!")
    setEmail("");
  }

  const handleEmailChange = (newText) => {
    setEmail(newText);
  }

  return (
    <motion.div layout className="text-white w-full md:h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-cloudline to-deep-wave z-0 transition-all duration-300">
      <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
        <Header />
        {displayError()}
        <OptInForm />
        <small className="font-thin">Or if you'd like to unsubscribe <a href="/" className="text-black font-bold hover:text-gray-800">click here</a></small>
      </div>
    </motion.div>
  );
}

export default App;
