import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars  } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import userAlt from "../src/assets/images/userAlt.png";
const TopBar = () => { 
    const [showMenu, setShowMenu] = useState(false); 
    const {signOutUser, user} = useContext(AppContext);
    
    showMenu

    return(
    <>
    {
        showMenu && (
        <div onClick={()=>{setShowMenu(false)}} className="w-full p-4 flex justify-end h-screen absolute z-20 bg-[#0000008b] ">
            <div className="w-[250px] flex flex-col gap-6  bg-white p-4 h-fit relative top-[60px] rounded-xl shadow-md">
                <div className="flex gap-1 items-center">
                    <div className="w-10  h-10 lg:w-16  lg:h-16 bg-slate-300 rounded-full ">
                        <img src={userAlt} alt="" srcset="" className="w-full h-full" />
                    </div>
                    <div className="">
                        <p className="text-slate-500 font-bold text-[14px]">{user.name ? user.name : "Username"}</p>
                        <p className="text-slate-500 text-[12px] font-normal">{user.email}</p>
                    </div>
                </div>
                <button onClick={()=>{signOutUser()}} className="bg-red-500 w-full p-1 text-slate-400">Logout</button>
            </div>
        </div>
        )
    }
    <div className="w-full h-[56px] flex items-center px-6 shadow-md justify-between">
        <h1 className="lg:text-3xl text-xl">RealTime VoiceTranslation</h1>
        <button onClick={()=>{setShowMenu(true)}}>
            <FontAwesomeIcon  icon={faBars} className="text-[20px]" />
        </button>
    </div>
    </>
)}
export default TopBar;