import { Button, Form, Input } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useCallback,useState } from "react";
import zxcvbn from 'zxcvbn';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/register`,
        values
      );

      // mfaSecret: newuser.mfaSecret,
      // mfaEnabled: newuser.mfaEnabled,
      // qrCodeUrl: qrCodeUrl

      console.log(response); 
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/qr", { state : { mfaSecret: response.data.user.mfaSecret, qrCodeUrl: response.data.user.qrCodeUrl} });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  // const [score, setScore] = useState(0);

  // const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  // const handleChange = (e) => {    
  //   const result = zxcvbn(e.target.value);
  //   setScore(result.score);
  // };

  // const getColor = useCallback((score) => {
  //   switch(score) {
  //     case 0: return '#e74c3c';       
  //     case 1: return '#e67e22';       
  //     case 2: return '#f1c40f';      
  //     case 3: return '#2ecc71';       
  //     case 4: return '#27ae60';      
  //     default: return '#ccc';
  //   }
  // },[]);
  return (
    <div className="flex w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left side - Clinic info */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 flex-col justify-center items-center p-8">
          <div className="text-center text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">HealthBag</h1>
            <p className="text-xl">Online Appointment System</p>
            <div className="mt-6 w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-3xl text-blue-600 font-bold">HB</span>
            </div>
          </div>

          <img
            className="max-w-xs w-full rounded-lg shadow-md"
            src="https://img.freepik.com/premium-vector/personal-doctor-appointment-2d-vector-isolated-illustration-visit-professional-health-facility-flat-characters-cartoon-background-getting-treatment-plan-symptoms-conditions-colourful-scene_151150-5797.jpg?w=2000"
            alt="Doctor appointment illustration"
          />

          <p className="text-white text-center mt-4">Your Health, Our Priority</p>
        </div>

        {/* Right side - Register form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600">Register to book appointments</p>
            </div>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Full name" className="rounded-md py-2" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Email address" className="rounded-md py-2" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" },
                { min: 10, message: "Password must be at least 10 characters" },
                { max: 42, message: "Password can contain only 42 characters" },
                // { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Must include upper, lower, number, and special character' }
                
              ]}
              >
                <PasswordInput placeholder="Password" className="rounded-md py-2" />
               
              </Form.Item>

              <Button
                className="bg-blue-600 hover:bg-blue-700 font-medium py-2 rounded-md my-4 w-full"
                htmlType="submit"
              >
                Sign Up
              </Button>
            </Form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Already have an account? Login
              </Link>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">© 2025 HealthBag</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
