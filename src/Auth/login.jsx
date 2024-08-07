import { useContext, useEffect, useState } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCancel, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import illustration from "../assets/images/login-illustration.svg"
import { Outlet, Link } from "react-router-dom";
import {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
  } from "firebase/auth";
import { app, firebaseConfig } from "../../firebase";
import Loader from "../component/Loader";
import { AppContext } from "../context/AppContext";
import Alert from "../component/Alert";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const {user, setUser} = useContext(AppContext);
    function SignInWithEmail(){
        setLoading(true);
        const auth = getAuth(app)
        setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  }).then((userCredential)=>{
            console.log(userCredential.user);
            // setUser(userCredential.user);
        }).catch((error)=>{
            console.log(error);
            alert(error);
        }).finally(()=>{
            setLoading(false);
        })
    }


    return(
        <>
        {/* {showAlert && (
            <Alert errorMes={}  />
        )} */}
            {false && <div className=" w-full bg-red-300 p-5 flex items-center gap-4 ">
                <FontAwesomeIcon icon={faCancel} className="text-red-700"/>
                <p className="text-red-700">Wrong login credentials</p>
            </div>}

            <div className="h-screen w-[full]  flex justify-center items-center">
                {loading && <Loader /> }
                <div className="w-full h-full lg:h-fit max-w-[800px] flex justify-center gap-4 bg-slate-200 lg:rounded-3xl p-6 shadow-md">
                    <div className="w-1/2 hidden md:flex justify-center items-center ">
                        <img src={illustration} alt="illustrator" />
                    </div>
                    <div className="w-[5px] hidden md:flex h-[400px] bg-slate-300"></div>
                    <div className="w-full lg:w-1/2 lg:p-4 text-center flex flex-col gap-5">
                        <h1 className="text-center text-[30px] font-[cursive]">Login</h1>
                        <h2 className="text-violet-500 text-xl">Welcome,<span className="text-slate-600"> Please Sign In</span></h2>
                        <div className="border-slate-500 border-[2px] border-solid p-2 px-4 rounded-3xl flex items-center">
                            <input className="w-full text-slate-700 h-6 border-none outline-none bg-transparent" placeholder="Email" type="text" name="" id="" onChange={(text)=>{setEmail(text.target.value)}} />
                            <FontAwesomeIcon icon={faUser} className="text-slate-400"/>
                        </div>
                        <div className="border-slate-500 border-[2px] border-solid p-2 px-4 rounded-3xl flex items-center">
                            <input className="w-full text-slate-700 h-6 border-none outline-none bg-transparent" placeholder="Password" type="password" name="" id="" onChange={(text)=>{setPassword(text.target.value)}} />
                            <FontAwesomeIcon icon={faLock} className="text-slate-400"/>
                        </div>
                        <button onClick={()=>{SignInWithEmail();}} className="h-10 bg-violet-500 rounded-3xl text-white">Submit</button>
                        {/* <h1 className="text-center">OR</h1> */}
                        <div className="w-full h-10 bg-orange-2 text-black border-[2px] border-solid p-2 px-4 rounded-3xl flex gap-4 items-center justify-center">
                        <p>Don't have an Account ? </p>
                            <span className="text-violet-500"> 
                                <Link to={`/signup`}>SignUp</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;