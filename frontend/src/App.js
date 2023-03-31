import { Routes, Route } from "react-router-dom";
import Header from "./components/elements/Header";
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
function App() {
  return (
    <div className="bg-dark">

      <Header />

      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>
          <Route path="/" element={ <HomeScreen /> } exact />

          <Route path="/tutor-list" element={ <TutorListScreen /> } exact />
          <Route path="/tutor-list/tutor/:id" element={ <TutorDetailScreen /> } exact />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/lesson-list" element={ <LessonListScreen /> } exact />
          <Route path="/lesson-list/products/:id" element={ <ProductScreen /> } exact />
          <Route path="/add-lesson" element={ <AddScreen/> } exact />

          <Route path="/login" element={ <LoginScreen /> } exact />
          <Route path="/profile" element={ <ProfileScreen /> } exact />

          <Route path="/contact-us" element={ <ContactScreen /> } exact />
          <Route path="/contact-success" element={ <SuccessScreen/> } exact />
          {/* <Route path='/order/:id' element={<OrderScreen/>} /> */}
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
