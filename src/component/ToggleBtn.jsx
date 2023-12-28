import { useState } from "react";

const ToggleBtn = ({handleExtClick, status}) => {
    const [isOn, setIsOn] = useState(false)
    const handleClick = ()=> {
        // setIsOn(!isOn);
        handleExtClick();
    }
    return(
        <>
            <p>Auto Translate</p>
            <div onClick={handleClick} className="w-16 h-8 flex justify-center items-center bg-slate-300 rounded-2xl"> 
                <div className="w-[80%] h-6 relative ">
                    <div className={`w-6 h-6 absolute ${status ? "bg-violet-600 translate-x-[100%]"  : "bg-slate-400 translate-x-[0]"} rounded-full transition-all delay-70 ease-in-out`}></div>
                </div>
            </div>
        </>
    )
}

export default ToggleBtn;