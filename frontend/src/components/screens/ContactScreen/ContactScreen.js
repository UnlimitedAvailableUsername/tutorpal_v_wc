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
 
function ContactScreen() {
  const [concern, setConcern] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Post = async () => {
    let formField = new FormData();

    formField.append("concern", concern);
    formField.append("comment", comment);

    dispatch(AddContact(formField)).then((response) => {
      navigate("/contact-success");
    });
  };

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

        <div className="container">
          <div className="row">
            <div className="column">
              <div className="contact-widget">
                <div className="contact-widget-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div className="text">
                    <h5>Address</h5>
                    <p>
                      #1 Holy Angel Avenue, Sto. Rosario St. Angeles City 2009
                    </p>
                  </div>
                </div>

                <div className="contact-widget-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="text">
                    <h5>Contact Us</h5>
                    <p>0961-739-2086</p>
                  </div>
                </div>

                <div className="contact-widget-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="text">
                    <h5>Mail</h5>
                    <p>tutorpal@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Concern</Form.Label>
                <Form.Control
                  type="text"
                  id="concern"
                  name="concern"
                  className="form-control"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  id="comment"
                  name="comment"
                  className="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>



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
    </div>
  );
}

export default ContactScreen;
