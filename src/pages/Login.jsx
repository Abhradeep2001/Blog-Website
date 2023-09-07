import {auth, provider} from "../config/firebase-config";
import {signInWithPopup} from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
export const Login=()=>{

    const navigate=useNavigate();

    const [userInfo]=useAuthState(auth);

    //Function to sign in with google
    const signIn= async() =>{
        await signInWithPopup(auth,provider).then((res) =>{
            navigate("/");  //After login automatic login to home page
        })
    }

    if (userInfo)
        return <Navigate to="/" />
        
    return(
         <div className="login-container">
            <h2>Login</h2>
            <p>Welcome back! Please log in to your account.</p>
            <button className="login-with-google-btn" onClick={signIn}>Login In With Google</button>
        </div>   
    )
}