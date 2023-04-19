import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject, deleteSubject, listSubjects } from '../../../features/redux/actions/contactActions';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Button, Container , Table} from 'react-bootstrap';

function AddSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addSubjectState = useSelector((state) => state.addSubjectState) || {};
  const { loading, error } = addSubjectState;

  const subjectList = useSelector((state) => state.subjectList);
  const subjects = subjectList?.subjects;

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

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

  const handleDelete = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        const subject = subjects.find((subject) => subject.id === subjectId);
        await dispatch(deleteSubject(subjectId, subject));
        navigate("/subject-admin");
        window.location.reload(); // <-- add this line
      } catch (error) {
        console.log(error);
        // handle error
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Container>
        <Table striped responsive className="table-m-2">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects && subjects.map((subject) => (
              <tr key={subject.id}>
                <td>
                  {subject.subject_title} 
                 
                </td>
                                
                <td>
                  <Link to={`/subject-edit/${subject.id}`}>
                    <button type="button" className="btn btn-warning">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {!showForm ? (
        <Button className='btn btn-warning' onClick={toggleForm}>Show Form</Button>
      ) : (
        <>
          <h2 style={{ color: 'orange', textAlign: 'center' }}>Add Subject</h2>
          <Container style={{ maxWidth: '500px' }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <Form>
              <Button className='btn btn-warning' onClick={toggleForm}>Hide Form</Button>
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
