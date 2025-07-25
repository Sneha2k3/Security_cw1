import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/login`,
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        if(response.data.mfaRequired) {
          // Redirect to MFA page if required
          navigate("/mfa", { state: { email: values.email },replace:true });
          return;
        }
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Form layout="vertical" onFinish={onFinish}>
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
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input placeholder="Password" type="password" className="rounded-md py-2" />
              </Form.Item>

              <Button
                className="bg-blue-600 hover:bg-blue-700 font-medium py-2 rounded-md my-4 w-full"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form>

            <div className="text-center mt-4">
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Don't have an account? Register
              </Link>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">© 2025 HealthBag</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
