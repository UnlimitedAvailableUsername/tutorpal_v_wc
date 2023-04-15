import { Routes, Route } from "react-router-dom";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
import AddScreen from "./components/screens/AddScreen/MyScheduleScreenTutor";
import ProfileScreen from "./components/screens/ProfileScreen/ProfileScreen";
import SuccessScreen from "./components/screens/ContactScreen/Success";
import DoesNotExistScreen from "./components/screens/DoesNotExistScreen/DoesNotExistScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import AboutUsScreen from "./components/screens/AboutUs/AboutUsScreen";
import ListContact from "./components/screens/ListContactsScreen/ListContact";
import ContactDetail from "./components/screens/ContactDetailScreen/ContactDetail";
import { useSelector } from "react-redux";
import EditSchedule from "./components/screens/EditScheduleScreen/EditSchedule";
import HeaderStudent from "./components/elements/HeaderStudent";
import HeaderHomePage from "./components/elements/HeaderHomePage";
import HeaderTutor from "./components/elements/HeaderTutor";
import TermsAndConditionScreen from "./components/screens/RegisterScreen/TermsAndConditionScreen";
import ChooseScheduleScreen from "./components/screens/ChooseScheduleScreen/ChooseScheduleScreen";
import AdminTutor from "./components/screens/AdminTutorScreen/AdminTutor";
import ListContactdone from "./components/screens/ListContactsScreen/ListContactdone";


function App() {

    const userLogin = useSelector((state) => state.userState);
    const { userInfo } = userLogin;

    return (
        <div className="bg-dark">

            {userInfo && (userInfo.tutor || userInfo.user?.tutor || userInfo.staff || userInfo.user?.staff) && (
                <HeaderTutor />
            )}
            {userInfo && (userInfo.student || userInfo.user?.student) && (
                <HeaderStudent />
            )}
            {!userInfo && (
                <HeaderHomePage />
            )}

            <div className="screen" style={{ overflowX: "hidden" }} >
                <Routes>
                    <Route path="/" element={<HomeScreen />} exact />

                    <Route path="/tutor/:tutorId/schedules" element={<ChooseScheduleScreen />} />

                    <Route path="/tutorAdmin" element={<AdminTutor />} exact />

                    <Route path="/tutorAdmin" element={<AdminTutor />} exact />

                    <Route path="/tutor" element={<TutorListScreen />} exact />
                    <Route path="/tutor/:tutorId" element={<TutorDetailScreen />} exact />

                    <Route path="/myschedule" element={<AddScreen />} exact />

                    <Route path="/login" element={<LoginScreen />} exact />
                    <Route path="/register" element={<RegisterScreen />} exact />
                    <Route path="/terms-and-condition" element={<TermsAndConditionScreen />} exact />
                    <Route path="/profile" element={<ProfileScreen />} exact />

                    <Route path="/contact-us" element={<ContactScreen />} exact />
                    <Route path="/contact-success" element={<SuccessScreen />} exact />
                    <Route path="/contact-details/:contactId" element={<ContactDetail />} exact />
                    <Route path="/concern-list" element={<ListContact />} exact />
                    <Route path="/concern-list/done" element={<ListContactdone />} exact />

                    <Route path="/schedule-details/:scheduleId" element={<EditSchedule />} exact />

                    <Route path="/about-us" element={<AboutUsScreen />} exact />

                    <Route path="*" element={<DoesNotExistScreen />} />

                </Routes>
            </div>

            <Footer />

        </div>
    );
}

export default App;
