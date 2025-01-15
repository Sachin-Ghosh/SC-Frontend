import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authpage from './pages/Login';
// import Event from './pages/SportsEvent';
// import Registration from './pages/Registration';
import SportsEvent from './pages/student/SportsEvent';
// import CulturalEvents from './pages/CulturalEvents';
import CulturalEvent from './pages/student/CulturalEvents';
// import Details from './pages/events/Details';
import EventDetails from './pages/student/Details';
import Grievance from './pages/Grieviances';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Registration from './pages/student/Registration';
// import RegisteredEvents from './pages/RegisteredEvents';
import RegistrationDetails from './pages/student/RegistrationDetails';
import UpdateProfile from './pages/UpdateProfile';
import RegisteredEvents from './pages/student/RegisteredEvents';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Score from './pages/Score';
import MyGrievance from './pages/MyGrievance';
import ScoresPage from './pages/faculty/Scores';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import Participants from './pages/faculty/Participants';
import ViewHeats from './pages/faculty/ViewHeats';
import LeaderboardPage from './pages/faculty/LeaderBoard';
import CouncilEventsPage from './pages/council/Getassignedevents';
import TeamSearch from './pages/council/Getregistration';
import HeatsPage from './pages/council/HeatsPage';
import GrievanceDetail from './pages/GrievanceDetail';
import GrievanceDetailPage from './pages/GrievanceDetail';
import ScoresForm from './pages/faculty/ScoresForm';

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
    <Route path="/my-grievances" element={<MyGrievance />} />
    <Route path="/my-grievances/:id" element={<GrievanceDetailPage />} />
    <Route path="/registered-events" element={<RegisteredEvents />} />
    <Route path="/registered-events/:event" element={<RegistrationDetails />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/update" element={<UpdateProfile />} />
    <Route path="/about" element={<About />} />
    <Route path="/score-board" element={<Score />} />
    {/* faculty routes */}
    <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
    <Route path="/scores" element={<ScoresPage />} />
    <Route path="/participants/:eventId" element={<Participants />} />
    <Route path="/score/:eventId" element={<ScoresForm />} />
    <Route path="/view-heats" element={<ViewHeats />} />
    <Route path="/leaderboard" element={<LeaderboardPage />} />
    {/* council routes */}
    <Route path="/search-teams" element={<TeamSearch/>} />
    <Route path="/council-dashboard" element={<CouncilEventsPage/>} />
    <Route path="/heats/:id" element={<HeatsPage />} />
  </Routes>
);

export default AppRoutes;

