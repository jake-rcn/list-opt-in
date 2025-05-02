import { useEffect, useState } from "react";

const Spokes = () => {

    const [show, setShow]  = useState(false);

    const alternateSpokeCount = () => {
        setShow(!show);
    }

    useEffect(() => {
        const changeSpokesInterval = setInterval(alternateSpokeCount, 1000);
        return () => {
            clearInterval(changeSpokesInterval);
        }
    })

    return (
    <div className="relative h-9 w-9 flex flex-col items-center justify-between border border-neutral-white rounded-full transition-all duration-1000 animate-spin">
        <div className="w-full flex items-center justify-center">
            <div className="bg-neutral-white h-3 w-1 rounded-t"></div>
        </div>
        <div className={`w-full flex flex-row justify-between transiton-all duration-400 ${show ? 'scale-100 opacity-100' : 'opacity-0 scale-0'}`}>
            <div className="bg-neutral-white w-3 h-1 rounded-l"></div>
            <div className="bg-neutral-white w-3 h-1 rounded-r"></div>
        </div>
        <div className="w-full flex items-center justify-center">
            <div className="bg-neutral-white h-3 w-1 rounded-b"></div>
        </div>
    </div>
    )
}

export default Spokes;