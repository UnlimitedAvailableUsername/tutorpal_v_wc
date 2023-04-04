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

      //PARA MAREMOVE DIN YUNG NAKA STORE WHEN UPDATING THE FORM
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('meeting_link');
    localStorage.removeItem('bio');
    };

    
  
  const loginUser = useSelector( (state) => state.userState);
  const { userInfo } = loginUser;

  const navAccountTitle = <FontAwesomeIcon title="" fixedWidth inverse icon={faUser} />;
 
  const headerStyle = {
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
  };
  

    return (
        
        <Navbar style={headerStyle} sticky="top" bg="dark" expand="lg" variant="dark" >
            <Container className="justify-content-center" >
                <Navbar.Brand  to='/'>
                    <img alt="Logo" src={logo} className="ms-5" height="auto" width="160" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <NavLink as={ Link } to="/lesson-list">Lessons</NavLink>
                        <NavLink as={ Link } to="/tutor-list">Find Tutor</NavLink>
                        <NavLink as={ Link } to="/about">About Us</NavLink>
                        <NavLink as={ Link } to="/contact-us">Contact Us</NavLink>
                    </Nav>
                    <Nav className="md-auto">
                        
                        { userInfo ? (
                            <NavDropdown variant="dark" title={<span>{navAccountTitle} {userInfo.user?.username || userInfo.username}</span>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={ Link } to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={ handleLogout }>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown variant="dark" title={"Sign"} id="basic-nav-dropdown">
                                <NavDropdown.Item as={ Link } to="/login">Sign In</NavDropdown.Item>
                            </NavDropdown>
                        )}
                       

                        {/* GANTO ANG CONDITION PARA EITHER ALIN SA DALAWANG USERINFO LUMITAW */}
                        {userInfo && (userInfo.user?.tutor || userInfo.tutor) && (
                        <NavDropdown variant="dark" title={userInfo.user?.username || userInfo.username} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Users</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/profile">Tutors</NavDropdown.Item>
                            <NavDropdown.Item href="/" onClick={handleLogout}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header;
