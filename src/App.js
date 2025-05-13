
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';

import Header from './components/header/Header.js';
import OptInForm from './components/optInForm/OptInForm.js';
import UnSubscribeForm from './components/unSubscribeForm/UnSubscribeForm.js';

function App() {

  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const formError = useSelector((state) => state.form.formError)

  const displayError = () => {
    return formError !== "" && <small className="text-red-500 font-sans-serif font-bold text-left">{formError}</small>
  }

  const renderForm = () => {
    return isUnsubscribing === true ? 
    (
      <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
        <UnSubscribeForm />
      </div>
    )
    :
    (
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
    )
  }

  return (
    <motion.div layout className="text-white w-full md:h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-cloudline to-deep-wave z-0 transition-all duration-300">
      {renderForm()}
    </motion.div>
  );
}

export default App;
