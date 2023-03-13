import Header from "./components/elements/Header";
import Footer from "./components/elements/Footer";
import { Routes, Route, useLocation, History } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";

function App() {
  return (
    <div className="bg-dark">

      <Header />

      <div className="screen">
        <Routes>
          <Route path="/" element={ <HomeScreen /> } exact />
          <Route path="/tutor-list" element={ <TutorListScreen /> } exact />
          <Route path="/login" element={ <LoginScreen /> } exact />
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
