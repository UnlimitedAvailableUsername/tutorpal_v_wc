import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useLocation, History } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";

function App() {
  return (
    <div>

      <Header />

      <div className="screen">
        <Routes>
          <Route path="/" element={ <HomeScreen /> } exact />
        </Routes>
      </div>

      <Footer />

    </div>
  );
}

export default App;
