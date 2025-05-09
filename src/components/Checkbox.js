import React from 'react';
import { motion } from 'motion/react';

const Checkbox = ({info, handleClick, index}) => {

    const {label, description, value} = info;

    const dynamicDelay = () => {
        console.log("Here is the index:", index)
        let delayString = `1.${3 + index}`;
        console.log("DELAY STRING", delayString)
        return Number(delayString)
    }

    return (
        <motion.div className="flex flex-row gap-2"
            initial={{opacity: 0, y: -50}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: dynamicDelay()}}
        >
            <input className="w-6 h-6" onChange={() => handleClick(label)} id={label} type="checkbox" value={value} checked={value} />
            <label className="font-bold" htmlFor={label}>{label}</label>
        </motion.div>
    )
};

export default Checkbox;