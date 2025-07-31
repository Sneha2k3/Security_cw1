/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());

      console.log(params.doctorId);

      const response = await axios.get(
        `/api/doctor/get-doctor-info-by-id/${params.doctorId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      console.log(doctor);
      console.log(response.data.data);
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/check-booking-availability`,
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(moment(selectedDate).format("DD-MM-YYYY"));
    setIsAvailable(false);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(moment(selectedTime, "HH:mm").format("HH:mm"));
    setIsAvailable(false);
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMM12rJXHhV8bIIqSSFq5sL7IU95gFt7C6SY79fA9DWB29egyssVTLWU8yZvRLgOfR64&usqp=CAU"
                alt="Doctor"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">Doctor Information</p>
                <p className="mb-2">
                  <span className="font-medium">Timings:</span>{" "}
                  {doctor.timings[0]} - {doctor.timings[1]}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Phone Number:</span>{" "}
                  {doctor.phoneNumber}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Address:</span> {doctor.address}
                </p>
                <p className="mb-4">
                  <span className="font-medium">Fee:</span> $
                  {doctor.feePerCunsultation}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-3">
                  Select Appointment Date & Time
                </p>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Date</label>
                  <input
                    type="date"
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Time</label>
                  <input
                    type="time"
                    onChange={handleTimeChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {!isAvailable ? (
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    onClick={checkAvailability}
                    disabled={!date || !time}
                  >
                    Check Availability
                  </button>
                ) : (
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                    onClick={bookNow}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
