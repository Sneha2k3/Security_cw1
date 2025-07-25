import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaMapMarkerAlt, FaMoneyBillAlt, FaClock } from "react-icons/fa";
import "./Doctor.css";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <div className="doctor-header">
        <div className="doctor-avatar">
          {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
        </div>
        <h1 className="doctor-name">
          Dr. {doctor.firstName} {doctor.lastName}
        </h1>
      </div>
      <div className="doctor-specialty">{doctor.specialization || "General Physician"}</div>
      <hr className="doctor-divider" />
      <div className="doctor-details">
        <p className="doctor-info">
          <FaPhone className="doctor-icon" />
          <span>{doctor.phoneNumber}</span>
        </p>
        <p className="doctor-info">
          <FaMapMarkerAlt className="doctor-icon" />
          <span>{doctor.address}</span>
        </p>
        <p className="doctor-info">
          <FaMoneyBillAlt className="doctor-icon" />
          <span>${doctor.feePerCunsultation}</span>
        </p>
        <p className="doctor-info">
          <FaClock className="doctor-icon" />
          <span>{doctor.timings[0]} - {doctor.timings[1]}</span>
        </p>
      </div>
      <button className="book-appointment-btn">Book Appointment</button>
    </div>
  );
}

export default Doctor;
