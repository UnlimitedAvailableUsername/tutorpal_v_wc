import React from "react";
import { Container, Nav, Row, NavLink, NavItem, Image, NavbarBrand, Navbar, NavDropdown, } from "react-bootstrap";
// import Login from "./Signup/TutorSignup";
import logo from "../assets/components/Header/logo.png";
import { Dropdown } from "react-bootstrap";
// import Signup from "../components/Signup";
// import { logout } from "../action/tutorActions";
import { useDispatch, useSelector } from "react-redux";

import "font-awesome/css/font-awesome.min.css";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
function Header() {
  //   const tutorLogin = useSelector((state) => state.tutorLogin);
  //   const { userInfo } = tutorLogin;
  //   const dispatch = useDispatch();
  //   const logoutHandler = () => {
  //     dispatch(logout());
  //   };

  return (
    <Navbar sticky="top" bg="dark" expand="lg" variant="dark" >
        <Container>
            <Navbar.Brand href="./.">
                <img alt="Logo" src={logo} class="ms-5" height="auto" width="160" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink href="#lesson">Lesson</NavLink>
                    <NavLink href="#tutors">Tutors</NavLink>
                    <NavLink href="#addLesson">Add Lesson</NavLink>
                    <NavLink href="#about">About Us</NavLink>
                    <NavLink href="#contact">Contact Us</NavLink>
                </Nav>
                <Nav className="md-auto">
                    <NavDropdown title="Apply" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#student-signup">Sign up as Student</NavDropdown.Item>
                        <NavDropdown.Item href="#tutor-signup">Sign up as Tutor</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#login">Sign In</NavDropdown.Item>
                        <NavDropdown.Item href="#logout">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Header;
