import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import {Toaster} from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import DoctorsList from './pages/Admin/DoctorsList';
import Userslist from './pages/Admin/Userslist';
import Profile from './pages/Admin/Doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/Admin/Doctor/DoctorAppointments';
import axios from "axios"
import Qr from './pages/Qr';
import UserProfile from './pages/UserProfile';
import MFA from './pages/MFA';


axios.defaults.baseURL = "http://localhost:5000"

function App() {
  const {loading} = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
    {loading && (<div className="spinner-parent">
        <div className="spinner-border" role="status">
        </div>
    </div>)}
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <Routes>
        <Route path= '/login' element={
          <PublicRoute>
          <Login/>
        </PublicRoute>}/>

        <Route path= '/mfa' element={
          <PublicRoute>
          <MFA/>
        </PublicRoute>}/>

          <Route path= '/register' element={
            <PublicRoute>
            <Register/>
          </PublicRoute>}/>
          <Route path='/' element = {<ProtectedRoute>
            <Home/>
          </ProtectedRoute>}/>

          <Route path='/apply-doctor' element = {<ProtectedRoute>
            <ApplyDoctor/>
          </ProtectedRoute>}/>

          <Route path='/notifications' element = {<ProtectedRoute>
            <Notifications/>
          </ProtectedRoute>}/>

          <Route path='/admin/userslist' element = {<ProtectedRoute>
            <Userslist/>
          </ProtectedRoute>}/>

          <Route path='/admin/doctorslist' element = {<ProtectedRoute>
            <DoctorsList/>
          </ProtectedRoute>}/>

          <Route path='/doctor/profile/:userId' element = {<ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}/>

          <Route path='/user/profile/:userId' element = {<ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>}/>

          <Route path='/book-appointment/:doctorId' element = {<ProtectedRoute>
            <BookAppointment/>
          </ProtectedRoute>}/>

          <Route path='/appointments' element = {<ProtectedRoute>
            <Appointments/>
          </ProtectedRoute>}/>

          <Route path='doctor/appointments' element = {<ProtectedRoute>
            <DoctorAppointments/>
          </ProtectedRoute>}/>

          <Route path='qr' element = {
            <Qr/>
          }/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
