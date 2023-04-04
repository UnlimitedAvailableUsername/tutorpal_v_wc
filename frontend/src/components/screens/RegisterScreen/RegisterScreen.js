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
                                        checked={student}
                                        onChange={(e) => setStudent(e.target.checked)}
                                        />
                                    </Form.Group>
                                  <div style={{margin: 'auto', width: 200}}className="d-grid my-5">
                                      <Button variant="warning" disabled={ !email || !password || !student }  type="submit"><stong>Sign Up</stong></Button>
                                  </div>
                              </Form>
                              <div className="mt-3">
                                  <p className="mb-0  text-center">
                                      Don't have an account?{' '}
                                      <Link to='#register' className="text-primary fw-bold">
                                          Sign Up
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
