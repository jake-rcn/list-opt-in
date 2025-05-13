
import './App.css';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './components/header/Header.js';
import OptInForm from './components/optInForm/OptInForm.js';

function App() {

  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const formError = useSelector((state) => state.form.formError)

  const displayError = () => {
    return formError !== "" && <small className="text-red-500 font-sans-serif font-bold text-left">{formError}</small>
  }

  return (
    <div className="flex flex-col items-start justify-center w-3/4 md:w-1/2 gap-2 z-10">
        <Header />
        {displayError()}
        <OptInForm />
        <motion.small className="font-thin"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2}}
        >
          Or if you'd like to unsubscribe <Link  to="/unsubscribe" className="text-black font-bold hover:text-gray-800">click here</Link>
        </motion.small>
    </div>
  );
}

export default App;
