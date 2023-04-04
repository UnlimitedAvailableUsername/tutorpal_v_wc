import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/elements/HeaderHomePage";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
import ScheduleListScreen from "./components/screens/ScheduleListScreen/ScheduleListScreen";
import ScheduleScreen from "./components/screens/ScheduleScreen/ScheduleScreen";
import AddScreen from "./components/screens/AddScreen/AddScreen";
import OrderScreen from "./components/screens/OrderScreen/OrderScreen";
import ProfileScreen from "./components/screens/ProfileScreen/ProfileScreen";
import SuccessScreen from "./components/screens/SuccessScreen/Success";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import TermsofServiceScreen from "./components/screens/TermsofServiceScreen/Termofservice";
import PrivacyPolicyScreen from "./components/screens/PrivacyPolicyScreen/PrivacyPolicy";
import AboutUsScreen from "./components/screens/AboutScreen/AboutUsScreen";
import { useEffect, useState } from "react";
import Contactlist from '../src/components/screens/ContactListScreen/ContactList'
import ContactDetail from '../src/components/screens/ContactDetailScreen/ContactDetail'


function App() {

  return (
    <div className="bg-dark">

  
 
      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>

          <Route path="/" element={ <HomeScreen /> } exact />
          <Route path="/register" element={ <RegisterScreen /> } exact />
      <Route path="/tutor-list" element={<TutorListScreen /> }  />
      <Route path="/tutor/:id" element={<TutorDetailScreen />} />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/schedule-list" element={ <ScheduleListScreen /> } exact />
          <Route path="/schedule-list/schedules/:id" element={ <ScheduleScreen /> } exact />
          <Route path="/add-schedule" element={ <AddScreen/> } exact />

          <Route path="/login" element={ <LoginScreen /> } exact />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/contact-us" element={ <ContactScreen /> } exact />
          <Route path="/contact-success" element={ <SuccessScreen/> } exact />
          <Route path="/concern-list" element={ <Contactlist/> } exact />
          <Route path="/concern-list/concern/:id" element={ <ContactDetail /> } exact />
          {/* <Route path='/order/:id' element={<OrderScreen/>} /> */}

          <Route path="/termsofservice" element={ <TermsofServiceScreen/> } exact />
          <Route path="/privacypolicy" element={ <PrivacyPolicyScreen/> } exact />
          <Route path="/about" element={ <AboutUsScreen/> } exact />

        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
