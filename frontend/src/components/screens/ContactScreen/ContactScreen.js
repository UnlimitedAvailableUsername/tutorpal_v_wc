<<<<<<< HEAD
import React from "react";
import "../../../assets/components/screens/ContactScreen/Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import { useNavigate,  } from "react-router-dom";
import {Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { AddContact } from "../../../features/redux/actions/contactActions";
import HeaderHome from '../../elements/HeaderHomePage'
import HeaderStudent from '../../elements/HeaderStudent'
import HeaderTutor from '../../elements/HeaderTutor'
 
=======
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { addContact } from "../../../features/redux/actions/contactActions";
import Widgets from "./Widgets";
import MapWidget from "./MapWidget";
import { useNavigate,  } from "react-router-dom";
import HeaderHome from '../../elements/HeaderHomePage'
import HeaderStudent from '../../elements/HeaderStudent'
import HeaderTutor from '../../elements/HeaderTutor'

>>>>>>> master
function ContactScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contactUsFormState = useSelector(state => state.contactUsFormState);
  const { loading, error } = contactUsFormState;

  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  const [formData, setFormData] = useState({
    concern: '',
    comment: '',
  });

  useEffect(() => {
    if (loading === false && error === null) {
      setFormData({ concern: '', comment: '' });
    }
  }, [loading, error]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(formData)).then((response) => {
      navigate("/contact-success");
    });
  };

<<<<<<< HEAD
  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  // const [userInfo, setUserInfo] = useState(null);


  // useEffect(() => {
  //   // Here, you can fetch the user info from an API or a local storage.
  //   // For this example, let's assume we're fetching it from local storage.
  //   const storedUserInfo = localStorage.getItem('userInfo');
  //   setUserInfo(storedUserInfo);
  // }, []);
  return (
    <div>

{userInfo && (userInfo.tutor || userInfo.user?.tutor) && (
      <HeaderTutor/>
    ) }

    {userInfo && (userInfo.student || userInfo.user?.student) && (
      <HeaderStudent/>
    ) }

{!userInfo && <HeaderHome />}

      <section className="contact">
      <br></br>
        <br></br>
        <div className="contact-heading">
          <h2>Contact Us</h2>
        </div>
=======
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log("formData after handleChange: ", formData);

  };

  return (
    <div>
{userInfo && (userInfo.tutor || userInfo.user?.tutor) && (
      <HeaderTutor/>
    ) }
>>>>>>> master

    {userInfo && (userInfo.student || userInfo.user?.student) && (
      <HeaderStudent/>
    ) }

{!userInfo && <HeaderHome />}

       <br/>
      <div className="contact-heading">
        <h2>Contact Us</h2>
      </div>

      <Widgets />

      <Container>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>What is your concern about?</Form.Label>
            <Form.Control
              type="text"
              id="concern"
              name="concern"
              className="form-control"
              value={formData.concern}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Please give us more details</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              id="comment"
              name="comment"
              className="text"
              value={formData.comment}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className="btn btn-warning"
            onClick={(e) => {
              if (formData.comment.length < 100) {
                alert(
                  "Please enter a comment with at least" +
                  " 100 characters"
                );
              } else {
                handleSubmit(e);
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>

      <MapWidget />

<<<<<<< HEAD


            <div style={{width: 400, margin: 'auto'}}>
              <Button
              
                className="btn btn-warning text-center"
                onClick={() => {
                  if (comment.length < 100) {
                    alert(
                      "Please enter a comment with at least " +
                        " 100 characters"
                    );
                  } else {
                    Post();
                  }
                }}
              >
                <strong>SEND</strong>
              </Button>
              </div>
            </Form>
          </div>
          <br></br>
          <div className="row">
            <div className="map-column">
              <div className="contact-map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.459608021156!2d120.58782231528241!3d15.133083167861306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f24ec2f5a1f9%3A0x5e0af8a6aaab2282!2sHoly%20Angel%20University!5e0!3m2!1sen!2sph!4v1675455294635!5m2!1sen!2sph"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
=======
>>>>>>> master
    </div>
  );
}

export default ContactScreen;
