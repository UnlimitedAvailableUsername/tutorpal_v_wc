<<<<<<< HEAD
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/elements/HeaderHomePage";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> master
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
<<<<<<< HEAD
import ScheduleListScreen from "./components/screens/ScheduleListScreen/ScheduleListScreen";
import ScheduleScreen from "./components/screens/ScheduleScreen/ScheduleScreen";
=======
>>>>>>> master
import AddScreen from "./components/screens/AddScreen/AddScreen";
import OrderScreen from "./components/screens/ChooseScheduleScreen/ChooseScheduleScreen";
import ProfileScreen from "./components/screens/ProfileScreen/ProfileScreen";
<<<<<<< HEAD
import SuccessScreen from "./components/screens/SuccessScreen/Success";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import TermsofServiceScreen from "./components/screens/TermsofServiceScreen/Termofservice";
import PrivacyPolicyScreen from "./components/screens/PrivacyPolicyScreen/PrivacyPolicy";
import AboutUsScreen from "./components/screens/AboutScreen/AboutUsScreen";
import { useEffect, useState } from "react";
import Contactlist from '../src/components/screens/ContactListScreen/ContactList'
import ContactDetail from '../src/components/screens/ContactDetailScreen/ContactDetail'


=======
import SuccessScreen from "./components/screens/ContactScreen/Success";
import DoesNotExistScreen from "./components/screens/DoesNotExistScreen/DoesNotExistScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import AboutUsScreen from "./components/screens/AboutUs/AboutUsScreen";
import ListContact from "./components/screens/ListContactsScreen/ListContact";
import ContactDetail from "./components/screens/ContactDetailScreen/ContactDetail";
>>>>>>> master
function App() {

  return (
    <div className="bg-dark">

<<<<<<< HEAD
  
 
=======


>>>>>>> master
      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>

<<<<<<< HEAD
          <Route path="/" element={ <HomeScreen /> } exact />
          <Route path="/register" element={ <RegisterScreen /> } exact />
      <Route path="/tutor-list" element={<TutorListScreen /> }  />
      <Route path="/tutor/:id" element={<TutorDetailScreen />} />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/schedule-list" element={ <ScheduleListScreen /> } exact />
          <Route path="/schedule-list/schedules/:id" element={ <ScheduleScreen /> } exact />
          <Route path="/add-schedule" element={ <AddScreen/> } exact />
=======
          <Route path="/tutor/:tutorId/schedules/:scheduleId" />

          <Route path="/tutor" element={ <TutorListScreen /> } exact />
          <Route path="tutor/tutor/:tutorId" element={ <TutorDetailScreen /> } exact />

          <Route path="/myschedule" element={ <AddScreen/> } exact />
>>>>>>> master

          <Route path="/login" element={ <LoginScreen /> } exact />
          <Route path="/register" element={ <RegisterScreen /> } exact />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/contact-us" element={ <ContactScreen /> } exact />
          <Route path="/contact-success" element={ <SuccessScreen/> } exact />
<<<<<<< HEAD
          <Route path="/concern-list" element={ <Contactlist/> } exact />
          <Route path="/concern-list/concern/:id" element={ <ContactDetail /> } exact />
          {/* <Route path='/order/:id' element={<OrderScreen/>} /> */}

          <Route path="/termsofservice" element={ <TermsofServiceScreen/> } exact />
          <Route path="/privacypolicy" element={ <PrivacyPolicyScreen/> } exact />
          <Route path="/about" element={ <AboutUsScreen/> } exact />

=======
          <Route path="/contact-details/:contactId" element={ <ContactDetail/> } exact />
          <Route path="/concern-list" element={ <ListContact /> } exact />

          <Route path="/about-us" element={ <AboutUsScreen/> } exact />

          <Route path="*" element={ <DoesNotExistScreen /> } />
    
>>>>>>> master
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
