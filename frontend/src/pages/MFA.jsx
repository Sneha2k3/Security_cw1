import axios from "axios";
import { useLocation } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const MFA = ()=> {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const [code, setCode] = React.useState('');
    return (
        <div className="w-[500px] mx-auto mt-5">
            <h1 className="text-2xl font-bold text-center mb-4">Multi-Factor Authentication</h1>
            <p className="text-center mb-4">Please enter the code from your authenticator app.</p>

            <input onChange={(e)=>{setCode(e.target.value)}} type="text" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Enter your code" />

            <button 
                onClick={()=> {
                    if(code.trim()=="") {
                        toast.error("Please enter the code.");
                        return;
                    }
                    axios.post('/api/user/verify-mfa', { 
                        code,email
                    }).then((response) => {
                        if (response.data.success) {
                            toast.success(response.data.message);
                            toast("Redirecting to home page");
                            localStorage.setItem("token", response.data.data);
                            navigate("/");
                        } else {
                            toast.error("Invalid code, please try again.");
                        }
                    }).catch(err=>{
                        console.error(err);
                        toast.error("Something went wrong, please try again.");
                    })
                }}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"> Continue </button>
        </div>
    )
}

export default MFA;