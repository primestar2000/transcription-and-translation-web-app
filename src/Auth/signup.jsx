import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCancel, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import illustration from "../assets/images/login-illustration.svg"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { app, firebaseConfig } from "../../firebase";
import Loader from "../component/Loader";
const SignUpPage = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");  
 const [passwordMatch, setPasswordMatch] = useState(false);
 const [loading, setLoading] = useState(false);
 useEffect(()=>{
   

        if (password == confirmPassword) {
            setPasswordMatch(true);
        }else{
            setPasswordMatch(false);
        }
    
    console.log(firebaseConfig);
 },[password, confirmPassword])
    function SignUpWithEmail(){
        setLoading(true);
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, password).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    }

    return(
        <>
            {false && <div className=" w-full bg-red-300 p-5 flex items-center gap-4 ">
                <FontAwesomeIcon icon={faCancel} className="text-red-700"/>
                <p className="text-red-700">Wrong login credentials</p>
            </div>}

            <div className="h-screen w-[full]  flex justify-center items-center">
                {
                    loading && (
                        <Loader />
                    )
                }
                <div className="w-full  h-full lg:h-fit max-w-[800px] flex justify-center gap-2 bg-slate-200 lg:rounded-3xl p-6 shadow-md">
                    <div className="w-1/2 hidden md:flex justify-center items-center ">
                        <img src={illustration} alt="illustrator" />
                    </div>
                    <div className="w-[5px] hidden md:flex h-[400px] bg-slate-300"></div>
                    <div className="w-full lg:w-1/2 lg:p-4 flex flex-col gap-2">
                        <h1 className="text-center text-[30px] font-[cursive]">Create Account</h1>
                        <h2 className="text-violet-500 text-xl text-center">Welcome,<span className="text-slate-600"> Please Enter Credentials</span></h2>
                        <div className={`${email.length > 10 && email.includes("@") ? "border-green-500" :"border-slate-500"} border-[2px] border-solid p-2 px-4 rounded-3xl flex items-center`}>
                            <input className="w-full h-6 text-slate-700  border-none outline-none bg-transparent" placeholder="Email" type="text" name="" id="" onChange={(text)=>{setEmail(text.target.value)}}/>
                            <FontAwesomeIcon icon={faUser} className="text-slate-400"/>
                        </div>
                        <div className={`${password.length > 5 ? "border-green-500" :"border-slate-500"} border-[2px] border-solid p-2 px-4 rounded-3xl flex items-center`}>
                            <input className="w-full h-6 text-slate-700 border-none outline-none bg-transparent" placeholder="Password" type="password" name="" id="" onChange={(text)=>{setPassword(text.target.value)}} />
                            <FontAwesomeIcon icon={faLock} className="text-slate-400"/>
                        </div>
                        <div className={`${passwordMatch ? "border-green-500" :"border-slate-500"} border-[2px] border-solid p-2 px-4 rounded-3xl flex items-center`}>
                            <input className="w-full h-6 text-slate-700 border-none outline-none bg-transparent" placeholder="Repeat Password" type="password" name="" id="" onChange={(text)=>{setConfirmPassword(text.target.value)}} />
                            <FontAwesomeIcon icon={faLock} className="text-slate-400"/>
                        </div>
                        <button onClick={()=>{SignUpWithEmail();}} className="h-10 bg-violet-500 rounded-3xl text-white">Submit</button>
                        <h1 className="text-center">OR</h1>
                        <div>
                            {/* <button onClick={()=>{SignUpWithGmail()}}>
                                <FontAwesomeIcon icon={faGoogle} className="text-red-400"/>
                            </button> */}
                        </div>
                        <div className="w-full h-10 bg-orange-2 text-black border-[2px] border-solid p-2 px-4 rounded-3xl flex gap-4 items-center justify-center">
                            <p>Already have Account ? </p>
                            <span className="text-violet-500"> 
                                <Link to={`/login`}>SignIn</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;