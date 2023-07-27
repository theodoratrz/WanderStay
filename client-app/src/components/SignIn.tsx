import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { SignUp } from "./SignUp";

export function SignIn(){

    const [isVisible, setVisible] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        pswd: ""
    })

    function saveCredentials(email : string, pswd: string){
        pswd === "" ?
        setCredentials({
            ...credentials,
            email,
        })
        :
        setCredentials({
            ...credentials,
            pswd,
        })
    }
    console.log(credentials.email, credentials.pswd)
    return(
        <div className="flex flex-col border-2 border-gray-300 h-2/3 w-1/3 rounded-3xl items-center gap-y-10">
            <b><h1 className="text-dark-petrol text-3xl mt-4">Σύνδεση</h1></b>
            <div className="flex flex-col items-start w-80">
                <h2 className="text-dark-petrol text-lg mt-4">Διεύθυνση e-mail</h2>
                <input type="email" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-80" onChange={(e) => saveCredentials(e.target.value,"")}/>
            </div>
            <div className="flex flex-col items-start">
                <h2 className="text-dark-petrol text-lg mt-4">Κωδικός</h2>
                <div className="flex bg-white border-2 border-gray-300 rounded-full h-10 justify-between items-center w-80">
                    <input type={isVisible ? "text" : "password"} className="bg-white border-0 text-black rounded-full w-4/5" onChange={(e) => saveCredentials("",e.target.value)}/>
                    <button className="bg-white rounded-full w-1/5 text-lg p-0" onClick={() => setVisible(!isVisible)}>
                        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye } size='lg' className="text-dark-petrol mr-4" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <i><a href="/">Ξεχάσατε τον κωδικό σας;</a></i>
                <p className="text-black">Δεν έχετε λογαριασμό; Εγγραφείτε <i><a href="/">εδώ</a></i></p>
            </div>
            <button className="text-lg w-60 bg-white border-2 border-dark-petrol text-dark-petrol rounded-3xl hover:border-white hover:bg-dark-petrol hover:text-white">
                <b>ΣΥΝΔΕΘΕΙΤΕ</b>
            </button>
        </div>
    )
}