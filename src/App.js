
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';

import Header from './components/header/Header.js';
import OptInForm from './components/optInForm/OptInForm.js';

import contactUpdate from './api/contactUpdate.ts';

function App() {

  const formError = useSelector((state) => state.form.formError)
  
  // const handleFormSubmit = async (e) => {
  //   console.log("Handle Form Submit triggered");
  //   setFormError("");
  //   console.log("Form Submitted !");
  //   setLoading(true);
  //   const checkboxData = {
  //     newsletter: allChecked === true ? true : newsletterChecked,
  //     recap: allChecked === true ? true : recapChecked,
  //     events: allChecked === true ? true : eventsChecked
  //   }
  //   const configuredPayload = {
  //     email,
  //     lists: checkboxData
  //   }
  //   const updated = await contactUpdate(configuredPayload);
  //   const {success} = updated;
  //   if (success === true) {
  //     setShowSuccess(true);
  //   } else {
  //     const {message} = updated
  //     setFormError(message);
  //     setShowError(true);  
  //   }
  //   setLoading(false);
  // }

  const displayError = () => {
    return formError !== "" && <small className="text-red-500 font-sans-serif font-bold text-left">{formError}</small>
  }

  return (
    <motion.div layout className="text-white w-full md:h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-cloudline to-deep-wave z-0 transition-all duration-300">
      <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
        <Header />
        {displayError()}
        <OptInForm />
        <motion.small className="font-thin"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2}}
        >
          Or if you'd like to unsubscribe <a href="/" className="text-black font-bold hover:text-gray-800">click here</a>
        </motion.small>
      </div>
    </motion.div>
  );
}

export default App;
