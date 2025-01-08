import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authpage from './pages/Login';
// import Event from './pages/SportsEvent';
// import Registration from './pages/Registration';
import SportsEvent from './pages/SportsEvent';
// import CulturalEvents from './pages/CulturalEvents';
import CulturalEvent from './pages/CulturalEvents';
import Details from './pages/events/Details';
import EventDetails from './pages/Details';
import Grievance from './pages/Grieviances';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Registration from './pages/Registration';
// import RegisteredEvents from './pages/RegisteredEvents';
import RegistrationDetails from './pages/RegistrationDetails';
import UpdateProfile from './pages/UpdateProfile';
import RegisteredEvents from './pages/RegisteredEvents';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Score from './pages/Score';

// import Registration from './pages/Registration';
// import Events from './pages/Events';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    <Route path="/auth/register" element={<SignUp/>} />
    <Route path="/events/sports" element={<SportsEvent />} />
    <Route path="/events/cultural" element={<CulturalEvent />} />
    <Route path="/:event/registration" element={<Registration />} />
    <Route path="/:event/details" element={<EventDetails />} />
    <Route path="/grievances" element={<Grievance />} />
    <Route path="/registered-events" element={<RegisteredEvents />} />
    <Route path="/registered-events/:event" element={<RegistrationDetails />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/update" element={<UpdateProfile />} />
    <Route path="/about" element={<About />} />
    <Route path="/score-board" element={<Score />} />
  </Routes>
);

export default AppRoutes;

