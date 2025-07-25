import Layout  from "../components/Layout"
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import axios from "axios"
import { showLoading, hideLoading } from '../redux/alertsSlice';
import DoctorForm from "../components/DoctorForm";
import moment from "moment";


function ApplyDoctor() {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post(`/api/user/apply-doctor-account`, {
                ...values,
                userId: user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                navigate('/');
            }else{
                toast.error(response.data.message);
            }
            console.log(values);
           }catch(error){
            dispatch(hideLoading());
            toast.error("Something went wrong");
           }
    }

  return (
    <Layout>
        <h1 className="page-title">Apply Doctor</h1>
<hr />
        <DoctorForm onFinish={onFinish}/>

    </Layout>
    // <div>ApplyDoctor</div>
  )
}

export default ApplyDoctor