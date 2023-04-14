<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIconBig from '../../elements/LoadingIcon'
import MessageAlert from '../../elements/MessageAlert'
// import FormContainer from '../components/FormContainer'
import { register } from '../../../features/redux/actions/authUserActions'

function RegisterScreen() {
 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [file, setFile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('')
    const [student, setStudent] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const form = async () => {
        let formField = new FormData();

        formField.append("username", username);
        formField.append("email", email);
        formField.append("first_name", first_name);
        formField.append("password", password);
        formField.append("last_name", last_name);
        formField.append("student", "true");
dispatch(register(formField)).then((response) => {
    navigate("/");
});
};


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            form();
        }

    };

    const userRegister = useSelector (state => state.userRegister)
    const {loading} = userRegister
    console.log('RegisterScreen rendered!') // added console log
    return (
      <div>
      <Row className="justify-content-center align-items-center">
          <Col xl={8} xs={10}>
              <Card className="px-4 my-5">
                  <Card.Body>
                      <div className="mb-3 mt-md-4">
                          <div className='mb-5' >
                              <h2 className="fw-bold text-uppercase ">SIGN UP</h2>
                              
                          </div>
                          <div className="mb-3">
                     
                              <Form onSubmit={ submitHandler }>
                                  <Form.Group className="mb-3" controlId="formBasicName">
                                      <Form.Label className="text-center">First Name</Form.Label>
                                      <Form.Control value={ first_name } onChange={(e) => setFirstName(e.target.value)} type="name" placeholder="Enter Name" />
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicName">
                                      <Form.Label className="text-center">Last Name</Form.Label>
                                      <Form.Control value={ last_name } onChange={(e) => setLastName(e.target.value)} type="name" placeholder="Enter Name" />
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicUsername">
                                      <Form.Label className="text-center">Username</Form.Label>
                                      <Form.Control value={ username } onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter Username" />
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicEmail">
                                      <Form.Label className="text-center">Email address</Form.Label>
                                      <Form.Control value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
                                  </Form.Group>


                                  <Form.Group className="mb-3" controlId="formBasicPassword">
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control value={ password } onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                      <Form.Label>Confirm Password</Form.Label>
                                      <Form.Control value={ confirmPassword } onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Enter Password" />
                                  </Form.Group>

                                  <Form.Group controlId="formBasicCheckbox">
=======
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import HeaderHomePage from '../../elements/HeaderHomePage'
import { registerUser } from '../../../features/redux/actions/authUserActions';

function RegisterScreen() {

  const [message, setMessage] = useState('')

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
	


    return (
      <div>
		   <HeaderHomePage/>
		
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
                                      <Form.Control value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} type="number" placeholder="Enter Contact" />
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
                                      <Form.Control value={ confirmPassword } onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Enter Password" />
                                  </Form.Group>

                                  <Form.Group style={{width: 250}} className="mb-3 " controlId="formBasicRole">
                                    <Form.Label className="text-center">Role</Form.Label>
                                    <Form.Select onChange={handleSelectChange} value={formData.tutor ? "tutor" : formData.student ? "student" : ""} aria-label="Select Contact Type" multiple={false}>
                                        <option value="">Select Role</option>
                                        <option value="tutor">Tutor</option>
                                        <option value="student">Student</option>
                                    </Form.Select>
                                  </Form.Group>


                                  {/* <Form.Group controlId="formBasicCheckbox">
>>>>>>> master
                                        <Form.Check
                                        type="checkbox"
                                        label={
                                            <>
                                            I accept the{' '}
                                            <a href="/termsofservice" target="_blank">
                                                Terms of Service
                                            </a>{' '}
                                            &{' '}
                                            <a href="/privacypolicy" target="_blank">
                                                Privacy Policy
                                            </a>
                                            </>
                                        }
                                        id="acceptTermsAndPrivacy"
                                        name="acceptTermsAndPrivacy"
<<<<<<< HEAD
                                        checked={student}
                                        onChange={(e) => setStudent(e.target.checked)}
                                        />
                                    </Form.Group>
                                  <div style={{margin: 'auto', width: 200}}className="d-grid my-5">
                                      <Button variant="warning" disabled={ !email || !password || !student }  type="submit"><stong>Sign Up</stong></Button>
                                  </div>
=======
                                        checked=''
                                        onChange=''
                                        />
                                    </Form.Group> */}

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
                                <Form.Control value={formData.price_rate_hour} onChange={(e) =>setFormData({ ...formData, price_rate_hour: e.target.value })} type="number" placeholder="Enter Price" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group style={{width: 300}} className="mb-2 ms-3 " controlId="formBasicSubject">
                                    <Form.Label  className="text-center">Subjects</Form.Label>
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
                                  <div style={{margin: 'auto', width: 200}}className="d-grid my-4">
                                      <Button variant="warning"  type="submit" onClick={handleSubmit}>Sign Up</Button>
                                  </div>
                                  </Row>
                                 


                                  </Row>
>>>>>>> master
                              </Form>
                              <div className="mt-3">
                                  <p className="mb-0  text-center">
                                      Don't have an account?{' '}
                                      <Link to='#register' className="text-primary fw-bold">
<<<<<<< HEAD
                                          Sign Up
=======
                                          Login
>>>>>>> master
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
