import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Checkbox from './components/Checkbox';

function App() {

  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [recapChecked, setRecapChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [eventsChecked, setEventsChecked] = useState(false);

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


  const handleFormSubmit = () => {

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

  return (
    <div className="text-white w-full md:h-screen flex flex-col items-center justify-center relative bg-gradient-to-tl from-rcn-blue to-black">
      <img src="/logo-white.png" className="w-60 h-40 object-cover z-10" />
      <div className="flex flex-col items-center justify-center w-3/4 md:w-1/2 gap-4 z-10">
        <h2 className="text-3xl font-bold self-start">Let's Stay Connected</h2>
        <p className="">We're updating our email list and want to make sure you're only getting the information you care about. Use the form below to let us know what topics you're interested in—like our newsletter, re/cap, or if you want all the updates. This helps us send you relevant content and cut down on the noise. Thanks for staying connected!</p>
        <form action={handleFormSubmit()} className="w-full" >
          <div className="w-full bg-gradient-to-tl from-white/20 to-rcn-blue/20 p-4 rounded flex flex-col gap-4">
            <h4 className="">Check the box for the lists you'd like to join!</h4>
            <div className="flex flex-col gap-2">
              {renderCheckboxes()}
            </div>
            <button className="bg-gradient-to-tl from-white/20 to-rcn-blue/20 rounded p-2 w-full transition-all duration-300 hover:bg-rcn-blue text-xl font-bold">Submit</button>
          </div>
        </form>
        <small className="font-thin">Or if you'd like to unsubscribe <a href="/" className="text-black font-bold hover:text-gray-800">click here</a></small>
      </div>
    </div>
  );
}

export default App;
