import { Routes, Route } from "react-router-dom";
import Header from "./components/elements/Header";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";

function App() {
  return (
    <div className="bg-dark">

      <Header />

      <div className="screen" style={{overflowX: "hidden"}} >
        <Routes>
          <Route path="/" element={ <HomeScreen /> } exact />
          <Route path="/tutor-list" element={ <TutorListScreen /> } exact />
          <Route path="/login" element={ <LoginScreen /> } exact />
          <Route path="/contact-us" element={ <ContactScreen /> } exact />
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
