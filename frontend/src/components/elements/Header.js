import { Container, Nav, NavLink, Navbar, NavDropdown, } from "react-bootstrap";
import logo from "../../assets/components/elements/Header/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from "../../features/redux/actions/authUserActions";


function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    };
  
  const loginUser = useSelector( (state) => state.userLoginState);
  const { userInfo } = loginUser;

  const navAccountTitle = (
    <>
      <FontAwesomeIcon title="" fixedWidth inverse icon={faUser} />
      &nbsp;
      {userInfo && userInfo.username ? userInfo.username : "Account"}
    </>
  );  

    return (
      <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
        <Container className="">
          <Navbar.Brand as={Link} to="/" className="ms-5">
            <img alt="Logo" src={logo} className="ms-5" height="auto" width="160" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {userInfo && userInfo.tutor ? (
                <Nav>
                  <NavLink as={Link} to="/add-lesson">
                    Add Lesson
                  </NavLink>
                </Nav>
              ) : (
                <Nav>
                  <NavLink as={Link} to="/lesson-list">
                    Lessons
                  </NavLink>
                  <NavLink as={Link} to="/tutor-list">
                    Tutors
                  </NavLink>
                  <NavLink as={Link} to="/about">
                    About Us
                  </NavLink>
                  <NavLink as={Link} to="/contact-us">
                    Contact Us
                  </NavLink>
                </Nav>
              )}
            </Nav>
            <Nav className="me-5">
              {userInfo && userInfo.staff ? (
                <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown" >
                  <NavDropdown.Item as={Link} to="/profile"> Profile </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#user-list-management"> Users </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#tutor-list-management"> Tutors </NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={handleLogout}> Sign Out </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo ? (
                <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown" >
                  <NavDropdown.Item as={Link} to="/profile"> Profile </NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={handleLogout}> Sign Out </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                 <NavDropdown variant="dark" title="Apply" id="basic-nav-dropdown" >
                    <NavDropdown.Item as={Link} to="/student-signup"> Sign up as Student </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/tutor-signup"> Sign up as Tutor{" "} </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown" >
                    <NavDropdown.Item as={Link} to="/login"> Sign In </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Header;
