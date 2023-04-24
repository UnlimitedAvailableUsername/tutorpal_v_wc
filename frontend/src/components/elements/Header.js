import { Container, Nav, NavLink, Navbar, NavDropdown, } from "react-bootstrap";
import logo from "../../assets/components/elements/Header/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from "../../features/redux/actions/authUserActions";

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginUser = useSelector((state) => state.userState);
  const { userInfo } = loginUser;

  const navAccountTitle = (
    <>
      <FontAwesomeIcon title="" fixedWidth inverse icon={faUser} />
      &nbsp;&nbsp;
      {userInfo && userInfo.username ? userInfo.username : "Account"}
    </>
  );

  const headerStyle = {
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
  };

  return (
    <Navbar style={headerStyle} sticky="top" bg="dark" expand="lg" variant="dark" >
      <Container className="justify-content-center" >
        <Navbar.Brand as={Link} to='/'>
          <img alt="Logo" src={logo} className="ms-5" height="auto" width="160" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {(userInfo && !userInfo.staff) || !userInfo ? (
              <>
                <NavLink as={Link} to="/subjects">Subjects</NavLink>
                <NavLink as={Link} to="/tutor">Find Tutor</NavLink>
                <NavLink as={Link} to="/about-us">About Us</NavLink>
                <NavLink as={Link} to="/contact-us">Contact Us</NavLink>
              </>
            ) : (
              null
            )}
            {userInfo && userInfo.staff ? (
              <>
                <NavLink as={Link} to="/tutor">Tutors</NavLink>
                <NavLink as={Link} to="/concern-list">Concerns</NavLink>
                <NavLink as={Link} to="/review-list">Reviews</NavLink>
                <NavLink as={Link} to="/subject-admin">Subjects</NavLink>
                <NavLink as={Link} to="/tutors-admit">Tutor Admission</NavLink>
                <NavLink as={Link} to="/user-list">Users</NavLink>
                <NavLink as={Link} to="/all-order-list">Orders</NavLink>
              </>
            ) : userInfo && userInfo.tutor ? (
              <>
                <NavLink as={Link} to="/myschedule">Schedules</NavLink>
                <NavLink as={Link} to="/my-students">Students</NavLink>
              </>
            ) : userInfo && userInfo.student ? (
              <>
               
              </>
            ) : null}
          </Nav>
          <Nav className="me-5">
            {userInfo && userInfo.staff ? (
              <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handleLogout}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            ) : userInfo && (userInfo.tutor || userInfo.student) ? (
              <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handleLogout}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Sign Up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;