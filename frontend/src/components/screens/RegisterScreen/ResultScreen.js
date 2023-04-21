import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_REGISTER_RESET } from '../../../features/redux/constants/authConstants';
import { Container } from 'react-bootstrap';
import MessageAlert from '../../elements/MessageAlert';
import { useNavigate } from 'react-router';

const ResultScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegisterState = useSelector((state) => state.userRegisterState);
  const { success, userRegistered } = userRegisterState;
  
  useEffect(() => {
    if (!success) {
      navigate('/login');
    }
  }, [success, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: USER_REGISTER_RESET });
    }, 6900);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Container>
      <h1 className='my-5'>Registration Successful!</h1>
      <h2 className='mb-5'>You will be redirected to login in 6.9 seconds.</h2>
      { userRegistered && userRegistered.student ? (        
        <MessageAlert variant="success">You have been successfully registered</MessageAlert>
      ) : userRegistered &&  userRegistered.tutor ? (
        <MessageAlert variant="info">You have been successfully registered. However, your account in still under evaluation. We will update you via your email.</MessageAlert>
      ): (
        null
      )}
    </Container>
  )
}

export default ResultScreen;
