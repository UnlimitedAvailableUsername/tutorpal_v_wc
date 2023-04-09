import { Routes, Route } from "react-router-dom";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
import AddScreen from "./components/screens/AddScreen/AddScreen";
import OrderScreen from "./components/screens/ChooseScheduleScreen/ChooseScheduleScreen";
import ProfileScreen from "./components/screens/ProfileScreen/ProfileScreen";
import SuccessScreen from "./components/screens/ContactScreen/Success";
import DoesNotExistScreen from "./components/screens/DoesNotExistScreen/DoesNotExistScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import AboutUsScreen from "./components/screens/AboutUs/AboutUsScreen";
function App() {
  return (
    <div className="bg-dark">



      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>
          <Route path="/" element={ <HomeScreen /> } exact />

          <Route path="/tutor/:tutorId/schedules/:scheduleId" />

          <Route path="/tutor" element={ <TutorListScreen /> } exact />
          <Route path="tutor/tutor/:tutorId" element={ <TutorDetailScreen /> } exact />

          <Route path="/add-lesson" element={ <AddScreen/> } exact />

          <Route path="/login" element={ <LoginScreen /> } exact />
          <Route path="/register" element={ <RegisterScreen /> } exact />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/contact-us" element={ <ContactScreen /> } exact />
          <Route path="/contact-success" element={ <SuccessScreen/> } exact />
          <Route path="/about-us" element={ <AboutUsScreen/> } exact />

          <Route path="*" element={ <DoesNotExistScreen /> } />
    
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
