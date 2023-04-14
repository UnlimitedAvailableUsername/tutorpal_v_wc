import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import HeaderHomePage from '../../elements/HeaderHomePage'
import { registerUser } from '../../../features/redux/actions/authUserActions';
import '../../../../src/assets/components/elements/Register/Register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from  '../../../assets/components/elements/Register/ama.png'

function RegisterScreen({height, imageSrc}) {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/profile';


    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [formData, setFormData] = useState({
      username: '',
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      contact: "",
      bio: "",
      active: "true",
      price_rate_hour: "",
      meeting_link: "",
      tutor: false,
      student: false,
      subjects: []
    });
  
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
    // };
  
    const handleSelectChange = (event) => {
      const { name, value } = event.target;
      const isTutor = value === 'tutor';
      setFormData({ ...formData, tutor: isTutor, student: !isTutor });
    };
  
    const handleSubjectsChange = (e) => {
      const { options } = e.target;
      const subjects = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          subjects.push(options[i].value);
        }
      }
      setFormData({ ...formData, subjects });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form data:", formData);
     
        dispatch(registerUser(formData));
    }



	const handleSubjectsMouseDown = (event) => {
		event.preventDefault();
		const option = event.target;
		const value = option.value;
	
		if (option.selected) {
		  setFormData((prevState) => ({
			...prevState,
			subjects: prevState.subjects.filter((v) => v !== value),
		  }));
		} else {
		  setFormData((prevState) => ({
			...prevState,
			subjects: [...prevState.subjects, value],
		  }));
		}
	
		option.selected = !option.selected;
	  };

    const backgroundStyles = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      // height: '100vh',
      backgroundAttachment: 'fixed',
    };
	

   
   const handleClickOnProfilePicture = (e) => {
      document.getElementById("profilePicture").click();
    }

    return (
      <div style={backgroundStyles}>
        <p><FontAwesomeIcon icon={faBullseye} size='2x' /> Choose from many highly qualified and trusted Tutors</p>
        <p><FontAwesomeIcon icon={faBullseye} size='2x' />100% risk free</p>
        <p><FontAwesomeIcon icon={faBullseye} size='2x' />24/7 access to the best tutors</p>
        <p><FontAwesomeIcon icon={faBullseye} size='2x' />Expert help in 10+ subjects</p>
        <p><FontAwesomeIcon icon={faBullseye} size='2x' />All tutors qualified and background-checked</p>


      <Row className="justify-content-center align-items-center">
          <Col xl={7} xs={10}>
              <Card className="px-5 my-5 shadow p-3 mb-5 rounded">
                  <Card.Body>
                      <div className="mb-4 mt-md-3">
                          <div className='mb-5' >
                              <h2 className="fw-bold text-uppercase ">SIGN UP</h2>
                              
                          </div>
                          <div className="mb-3">
                     
                    
                              <Form >
                                <Row>
                                    <Col>
                                  <Form.Group className="mb-2" controlId="formBasicFirstName">
                                      <Form.Label className="text-center">First Name</Form.Label>
                                      <Form.Control value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} type="name" placeholder="Enter Name" />
                                  </Form.Group>
                                  </Col>
                                  <Col> 
                                <Form.Group className="mb-2" controlId="formBasicLastName">
                                      <Form.Label className="text-center">Last Name</Form.Label>
                                      <Form.Control value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} type="name" placeholder="Enter Name" />
                                  </Form.Group>
                                  </Col>
                                  
                                  <Row>
                                  <Col>
                                  <Form.Group className="mb-2" controlId="formBasicUsername">
                                      <Form.Label className="text-center">Username</Form.Label>
                                      <Form.Control value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="username" placeholder="Enter Username" />
                                  </Form.Group>
                                  </Col>

                        <Col>
                          <Form.Group className="mb-2 ms-3" controlId="formBasicContact">
                            <Form.Label className="text-center">Contact Number</Form.Label>
                            <Form.Control value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} type="text" placeholder="Enter Contact" />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Enter Email" />
                      </Form.Group>


                      <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="Enter Password" />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Enter Password" />
                      </Form.Group>

                      <Form.Group style={{ width: 250 }} className="mb-3 " controlId="formBasicRole">
                        <Form.Label className="text-center">Role</Form.Label>
                        <Form.Select onChange={handleSelectChange} value={formData.tutor ? "tutor" : formData.student ? "student" : ""} aria-label="Select Contact Type" multiple={false}>
                          <option value="">--Select Role--</option>
                          <option value="tutor">Tutor</option>
                          <option value="student">Student</option>
                        </Form.Select>
                      </Form.Group>


                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label={
                            <>
                              I accept the{' '}
                              <Link to="/terms-and-condition">
                                Terms of Service
                              </Link>
                              {' '}
                              &{' '}
                              <Link to="/privacypolicy">
                                Privacy Policy
                              </Link>
                            </>
                          }
                          id="acceptTermsAndPrivacy"
                          name="acceptTermsAndPrivacy"
                        />
                      </Form.Group>

                      {formData.tutor && (
                        <>

                                <h1>.....</h1>
                                 <Form.Group className="mb-2 my-4 " controlId="formBasicBio">
                                <Form.Label className="text-center">Bio</Form.Label>
                                <Form.Control value={formData.bio} onChange= {(e) =>setFormData({ ...formData, bio: e.target.value })} as="textarea" placeholder="Enter Bio" />
                                </Form.Group>


                          <Row>
                            <Col>
                              <Form.Group className="mb-2 " controlId="formBasicPrice">
                                <Form.Label className="text-center">Price per Hour</Form.Label>
                                <Form.Control value={formData.price_rate_hour} onChange={(e) => setFormData({ ...formData, price_rate_hour: e.target.value })} type="number" placeholder="Enter Price" />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group style={{ width: 300 }} className="mb-2 ms-3 " controlId="formBasicSubject">
                                <Form.Label className="text-center">Subjects</Form.Label>
                                <Form.Select onChange={handleSubjectsChange} value={formData.subjects} aria-label="Select Contact Type" size="5" multiple={true} onMouseDown={handleSubjectsMouseDown}>

                                  <option value="1">Mathematics</option>
                                  <option value="2">Language and Literature</option>
                                  <option value="3">Science</option>
                                  <option value="4">History</option>
                                  <option value="5">others...</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>


                                  <Form.Group className="mb-2 " controlId="formBasicLink">
                                      <Form.Label className="text-center">Meeting Link</Form.Label>
                                      <Form.Control value={formData.meeting_link} onChange={(e) =>setFormData({ ...formData, meeting_link: e.target.value })} type="contact" placeholder="Enter Contact" />
                                  </Form.Group>
                                </>
                                    )}



                      <Row>
                        <div style={{ margin: 'auto', width: 200 }} className="d-grid my-4">
                          <Button variant="warning" type="submit" onClick={handleSubmit}>Sign Up</Button>
                        </div>
                      </Row>



                    </Row>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{' '}
                      <Link to='#register' className="text-primary fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </div>
  )
}


export default RegisterScreen
