import React from "react";
import { Container, Nav, Row, NavLink, NavItem, Image, NavbarBrand, Navbar, NavDropdown, } from "react-bootstrap";
// import Login from "./Signup/TutorSignup";
import logo from "../../assets/components/elements/Header/logo.png";
import { Dropdown } from "react-bootstrap";
// import Signup from "../components/Signup";
// import { logout } from "../action/tutorActions";
import { useDispatch, useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header() {
  //   const tutorLogin = useSelector((state) => state.tutorLogin);
  //   const { userInfo } = tutorLogin;
  //   const dispatch = useDispatch();
  //   const logoutHandler = () => {
  //     dispatch(logout());
  //   };
  
  const navAccountTitle = <><FontAwesomeIcon title="Account" fixedWidth inverse icon={faUser} /> Account</>;

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
                    <NavLink as={ Link } to="/addLesson">Add Lesson</NavLink>
                    <NavLink as={ Link } to="/about">About Us</NavLink>
                    <NavLink as={ Link } to="/contact">Contact Us</NavLink>
                </Nav>
                <Nav className="md-auto">
                    <NavDropdown variant="dark" title="Apply" id="basic-nav-dropdown">
                        <NavDropdown.Item as={ Link } to="/student-signup">Sign up as Student</NavDropdown.Item>
                        <NavDropdown.Item as={ Link } to="/tutor-signup">Sign up as Tutor</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown variant="dark" title={navAccountTitle} id="basic-nav-dropdown">
                        <NavDropdown.Item as={ Link } to="/login">Sign In</NavDropdown.Item>
                        <NavDropdown.Item as={ Link } to="/logout">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Header;
