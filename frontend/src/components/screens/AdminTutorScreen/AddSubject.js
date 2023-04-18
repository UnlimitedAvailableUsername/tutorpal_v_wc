import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject } from '../../../features/redux/actions/contactActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function AddSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addSubjectState = useSelector((state) => state.addSubjectState) || {};
  const { loading, error } = addSubjectState;

  const [formData, setFormData] = useState({
    subject_title: '',
  });

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubject(formData)).then((response) => {
      navigate('/');
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {!showForm ? (
        <Button  className='btn btn-warning' onClick={toggleForm}>Show Form</Button>
      ) : (
        <>
          <h2 style={{ color: 'orange', textAlign: 'center' }}>Add Subject</h2>
          <Container style={{ maxWidth: '500px' }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <Form>
              <Button  className='btn btn-warning' onClick={toggleForm}>Hide Form</Button>
              <Form.Group className='mb-3'>
                <Form.Label>Please add Subject </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={2}
                  id='subject_title'
                  name='subject_title'
                  className='text'
                  value={formData.subject_title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                className='btn btn-warning'
                onClick={(e) => {
                  if (formData.subject_title.length < 2) {
                    alert('Please enter a comment with at least 2 characters');
                  } else {
                    handleSubmit(e);
                  }
                }}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </>
      )}
    </div>
  );
}

export default AddSubject;
