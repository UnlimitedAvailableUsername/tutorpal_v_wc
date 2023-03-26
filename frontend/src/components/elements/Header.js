import { Container, Nav, NavLink, Navbar, NavDropdown, } from "react-bootstrap";
import logo from "../../assets/components/elements/Header/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from "../../features/redux/actions/authUserActions";


function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    };
  
  const loginUser = useSelector( (state) => state.userState);
  const { userInfo } = loginUser;

  const navAccountTitle = <FontAwesomeIcon title="" fixedWidth inverse icon={faUser} />;

    return (
        <Navbar sticky="top" bg="dark" expand="lg" variant="dark" >
            <Container className="justify-content-center" >
                <Navbar.Brand as={ Link } to='/'>
                    <img alt="Logo" src={logo} className="ms-5" height="auto" width="160" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <NavLink as={ Link } to="/lesson-list">Lessons</NavLink>
                        <NavLink as={ Link } to="/tutor-list">Tutors</NavLink>
                        <NavLink as={ Link } to="/add-lesson">Add Lesson</NavLink>
                        <NavLink as={ Link } to="/about">About Us</NavLink>
                        <NavLink as={ Link } to="/contact-us">Contact Us</NavLink>
                    </Nav>
                    <Nav className="md-auto">
                        <NavDropdown variant="dark" title="Apply" id="basic-nav-dropdown">
                            <NavDropdown.Item as={ Link } to="/student-signup">Sign up as Student</NavDropdown.Item>
                            <NavDropdown.Item as={ Link } to="/tutor-signup">Sign up as Tutor </NavDropdown.Item>
                        </NavDropdown>
                        { userInfo ? (
                            <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown">
                                <NavDropdown.Item as={ Link } to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={ handleLogout }>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown variant="dark" title={"Sign"} id="basic-nav-dropdown">
                                <NavDropdown.Item as={ Link } to="/login">Sign In</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        { userInfo && userInfo.tutor && (
                            <NavDropdown variant="dark" title={userInfo.username} id="basic-nav-dropdown">
                                <NavDropdown.Item as={ Link } to="/profile">Users</NavDropdown.Item>
                                <NavDropdown.Item as={ Link } to="/profile">Tutors</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={ handleLogout }>Sign Out</NavDropdown.Item>
                            </NavDropdown>

                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
