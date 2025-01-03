import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authpage from './pages/Auth';
// import Event from './pages/SportsEvent';
import Registration from './pages/Registration';
import SportsEvent from './pages/SportsEvent';
// import CulturalEvents from './pages/CulturalEvents';
import CulturalEvent from './pages/CulturalEvents';
import Details from './pages/events/Details';
import EventDetails from './pages/Details';
import Grievance from './pages/Grieviances';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/SignUp';

// import Registration from './pages/Registration';
// import Events from './pages/Events';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth/login" element={<Authpage />} />
    <Route path="/auth/register" element={<SignUp/>} />
    <Route path="/events/sports" element={<SportsEvent />} />
    <Route path="/events/cultural" element={<CulturalEvent />} />
    <Route path="/:event/registration" element={<Registration />} />
    <Route path="/:event/details" element={<EventDetails />} />
    <Route path="/grievances" element={<Grievance />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default AppRoutes;

