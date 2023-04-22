import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Footer from "./components/elements/Footer";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import TutorListScreen from "./components/screens/TutorListScreen/TutorListScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import ContactScreen from "./components/screens/ContactScreen/ContactScreen";
import TutorDetailScreen from "./components/screens/TutorDetailScreen/TutorDetailScreen";
import AddScreen from "./components/screens/MyScheduleScreenTutor/MyScheduleScreenTutor";
import ProfileScreen from "./components/screens/ProfileScreen/ProfileScreen";
import SuccessScreen from "./components/screens/ContactScreen/Success";
import DoesNotExistScreen from "./components/screens/DoesNotExistScreen/DoesNotExistScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import AboutUsScreen from "./components/screens/AboutScreen/AboutUsScreen";
import ListContact from "./components/screens/ListContactsScreen/ListContact";
import ContactDetail from "./components/screens/ContactDetailScreen/ContactDetail";
import { useSelector } from "react-redux";
import EditSchedule from "./components/screens/EditScheduleScreen/EditSchedule";
import TermsAndConditionScreen from "./components/screens/RegisterScreen/TermsAndConditionScreen";
import ChooseScheduleScreen from "./components/screens/ChooseScheduleScreen/ChooseScheduleScreen";
import AdminTutor from "./components/screens/AdminScreen/AdminTutor";
import ListContactdone from "./components/screens/ListContactsScreen/ListContactdone";
import Header from "./components/elements/Header";
import AdminTutorDetail from "./components/screens/AdminScreen/AdminTutorDetail";
import AddSubject from "./components/screens/AdminScreen/AddSubject";
import EditSubject from "./components/screens/AdminScreen/EditSubject";
import ScheduleOrderDetailsScreen from "./components/screens/ScheduleOrderDetailsScreen/ScheduleOrderDetailsScreen";
import ScheduleOrderListScreen from "./components/screens/ScheduleOrderListScreen/ScheduleOrderListScreen";
import AdminUserList from "./components/screens/AdminScreen/AdminUserList";
import EditUser from "./components/screens/AdminScreen/EditUser";
import RegisterForTutorScreen from "./components/screens/RegisterScreen/RegisterForTutorScreen";
import RegisterForStudentScreen from "./components/screens/RegisterScreen/RegisterForStudentScreen";
import ResultScreen from "./components/screens/RegisterScreen/ResultScreen";
import ReviewList from "./components/screens/AdminScreen/ReviewList";
import MyStudentsList from "./components/screens/MyStudentsList/MyStudentsList";
import StudentDetailPage from "./components/screens/StudentDetailScreen/StudentDetailScreen";

function App() {

    const userLogin = useSelector((state) => state.userState);
    const { userInfo } = userLogin;

    return (
        <div className="bg-dark">

            <Header />

            <div className="screen" style={{ overflowX: "hidden" }} >
                <Routes>
                    <Route path="/" element={<HomeScreen />} exact />

                    <Route path="/tutor/:tutorId/schedules" element={<ChooseScheduleScreen />} />

                    <Route path="/tutor" element={<TutorListScreen />} exact />
                    <Route path="/tutor/:tutorId" element={<TutorDetailScreen />} exact />

                    <Route path="/myschedule" element={<AddScreen />} exact />

                    <Route path="/login" element={<LoginScreen />} exact />
                    <Route path="/register" element={<RegisterScreen />} exact />
                    <Route path="/register/tutor" element={<RegisterForTutorScreen />} exact />
                    <Route path="/register/student" element={<RegisterForStudentScreen />} exact />
                    <Route path="/register/result" element={<ResultScreen />} exact />
                    <Route path="/terms-and-conditions" element={<TermsAndConditionScreen />} exact />
                    <Route path="/profile" element={ userInfo ? <ProfileScreen /> : <Navigate to="/login"/>} exact />

                    <Route path="/contact-us" element={<ContactScreen />} exact />
                    <Route path="/contact-success" element={<SuccessScreen />} exact />

                    <Route path="/concern-list" element={ userInfo && userInfo.staff ? <ListContact /> : <Navigate to="/" /> } exact />
                    <Route path="/contact-details/:contactId" element={ userInfo && userInfo.staff ? <ContactDetail /> : <Navigate to="/" />} exact />
                    <Route path="/concern-list/done" element={ userInfo && userInfo.staff ? <ListContactdone /> : <Navigate to="/" />} exact />
                    <Route path="/schedule-details/:scheduleId" element={ userInfo && userInfo.staff ? <EditSchedule /> : <Navigate to="/" />} exact />
                    <Route path="/tutors-admit" element={ userInfo && userInfo.staff ? <AdminTutor /> : <Navigate to="/" />} exact />
                    <Route path="/tutors-admit/details/:tutorId" element={ userInfo && userInfo.staff ? <AdminTutorDetail /> : <Navigate to="/" />} exact />
                    <Route path="/subject-admin" element={ userInfo && userInfo.staff ? <AddSubject /> : <Navigate to="/" />} exact />
                    <Route path="/subject-edit/:subjectId" element={ userInfo && userInfo.staff ? <EditSubject /> : <Navigate to="/" />} exact />
                    <Route path="/user-list" element={ userInfo && userInfo.staff ? <AdminUserList /> : <Navigate to="/" />} exact />
                    <Route path="/user-edit/:userId" element={ userInfo && userInfo.staff ? <EditUser /> : <Navigate to="/" />} exact />
                    <Route path="/review-list" element={ userInfo && userInfo.staff ? <ReviewList /> : <Navigate to="/" />} exact />

                    <Route path="/my-students" element={ userInfo && userInfo.tutor ? <MyStudentsList /> : <Navigate to="/" />} exact />
                    <Route path="/my-students/details/:studentId" element={ userInfo && userInfo.tutor ? <StudentDetailPage /> : <Navigate to="/" />} exact />

                    <Route path="/my-schedule-orders/" element={ userInfo ? <ScheduleOrderListScreen /> : <Navigate to="/login"/>} exact />
                    <Route path="/my-schedule-orders/:scheduleOrderId/" element={ userInfo ? <ScheduleOrderDetailsScreen /> : <Navigate to="/login"/>} exact />

                    <Route path="/about-us" element={<AboutUsScreen />} exact />
                    <Route path="*" element={<DoesNotExistScreen />} />
                </Routes>
            </div>

            <Footer />

        </div>
    );
}

export default App;
