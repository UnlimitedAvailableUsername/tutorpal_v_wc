import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/elements/HeaderHomePage";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
import LessonListScreen from "./components/screens/LessonListScreen/LessonListScreen";
import ProductScreen from "./components/screens/ProductScreen/ProductScreen";
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

 
    //ETO AY PARA GUMANA ANG CONDITIONING BY CALLING THE LOCALSTORAGE
    const [userInfo, setUserInfo] = useState(null);
 const navigate = useNavigate()
    useEffect(() => {
      // Here, you can fetch the user info from an API or a local storage.
      // For this example, let's assume we're fetching it from local storage.
      const storedUserInfo = localStorage.getItem('userInfo');
      setUserInfo(storedUserInfo);
    }, []);
   

  return (
    <div className="bg-dark">

  

      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>

          <Route path="/" element={ <HomeScreen /> } exact />
          <Route path="/register" element={ <RegisterScreen /> } exact />
      <Route path="/tutor-list" element={<TutorListScreen /> }  />
      <Route path="/tutor/:id" element={<TutorDetailScreen />} />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/lesson-list" element={ <LessonListScreen /> } exact />
          <Route path="/lesson-list/products/:id" element={ <ProductScreen /> } exact />
          <Route path="/add-lesson" element={ <AddScreen/> } exact />

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
