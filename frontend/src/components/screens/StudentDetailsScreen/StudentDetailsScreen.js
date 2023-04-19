import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  } from 'react-bootstrap';


const StudentDetailsScreen = () => {

  const { studentId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudent)
  }, []);
  
  return (
    <div>StudentDetailsScreen</div>
  )
}

export default StudentDetailsScreen