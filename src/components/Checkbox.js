

import React from 'react';

const Checkbox = ({info, handleClick}) => {

    const {label, description, checked} = info;

    return (
        <div className="flex flex-row gap-2">
            <input className="w-6 h-6" onChange={() => handleClick(label)} id={label} type="checkbox" value={checked} checked={checked} />
            <label className="font-bold" htmlFor={label}>{label}</label>
        </div>
    )
};

export default Checkbox;