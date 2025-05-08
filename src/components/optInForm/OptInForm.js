import { useSelector, useDispatch } from 'react-redux';

import Success from '../formMessages/success.js';
import UserEmail from '../formComponents/UserEmail.js';
import Checkbox from '../Checkbox.js';
import Spokes from '../loaders/spokes.js';

import { checkboxTapped, submitForm } from '../../store/slices/formSlice.js';

const OptInForm = () => {

    const dispatch = useDispatch();
    const form = useSelector((state) => state.form);
    const {checkBoxes, email, success, loading} = form;
    const {
        newsletter,
        recap,
        events,
        allOfTheAbove
    } = checkBoxes;

    const handleFormSubmit = () => {
        let userData = {
            email,
            checkBoxes
        }
        console.log("Here is the user data from handle form submit", userData);
        dispatch(submitForm(userData));
    }

    const renderCheckboxes = () => {    
        const checkboxes = [
            {label: "Newsletter", description: "This includes our weekly newsletter, events, and podcast updates.", value: newsletter},
            {label: "Re/Cap", description: "This includes our weekly Re/Cap. It goes over innovations in the built world in a casual, humored, technical way and we highlight a historical error that could have been avoided or fixed with current technology.", value: recap},
            {label: "Events", description: "Stay in the loop for all our events and updates to the events.",  value: events},
            {label: "All of the above", description: "", value: allOfTheAbove},
        ];
        return checkboxes.map((info, i) => <Checkbox handleClick={checkboxHandler} key={`${i}-${info.label}`} info={info} />)
    }

    const handleTap = (list) => {
        dispatch(checkboxTapped({checkbox: list}))
    }

    const checkboxHandler = (label) => {
        const checkboxCypher = {
          "Newsletter": {val: newsletter, changeFunc:() => handleTap('newsletter')},
          "Re/Cap": {val: recap, changeFunc:() => handleTap('recap')},
          "All of the above": {val: allOfTheAbove, changeFunc: () => handleTap('allOfTheAbove')},
          "Events": {val: events, changeFunc: () => handleTap('events')},
        }
        let checkBoxObject = checkboxCypher[label]
        checkBoxObject.changeFunc();
      }

    const presentButtonText = () => {
        return loading === true ?
          <Spokes />
        : 
        (
          "Submit"
        )
      }

    return (
        <form action={handleFormSubmit} className="w-full relative" >
          <Success display={success} />
          <div className="w-full bg-white/10 p-4 flex flex-col gap-4 rounded-lg">
            <UserEmail />
            <h4 className="">Check the box for the lists you'd like to join!</h4>
            <div className="flex flex-col gap-2">
              {renderCheckboxes()}
            </div>
            <button type="submit" className="bg-white/70 rounded w-full transition-all duration-300 hover:bg-white text-xl font-bold flex items-center justify-center text-rcn-blue py-1">{presentButtonText()}</button>
          </div>
        </form>
    )
}

export default OptInForm;