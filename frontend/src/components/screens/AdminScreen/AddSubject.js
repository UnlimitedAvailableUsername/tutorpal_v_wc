import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject, deleteSubject, listSubjects } from '../../../features/redux/actions/subjectActions';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Button, Container , Table, Card} from 'react-bootstrap';
import backgroundImage from  '../../../assets/components/screens/ScheduleScreen/secret.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

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
    dispatch(addSubject(formData)).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const subject = subjects.find((subject) => subject.id === subjectId);
        await dispatch(deleteSubject(subjectId, subject));
        window.location.reload(); // <-- modified line, removes navigate("/") call
      } catch (error) {
        console.log(error);
        // handle error
      }
    }
  };


  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '130vh',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={backgroundStyles}>
       <Container>
   
         
      <style jsx>{`
        .card {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }

        .one {
          display: flex;
          justify-content: center;
        }
      `}</style>

<br/><br/> 
<h1 style={{  textAlign: "center", fontSize: 100, textShadow:'2px 2px 4px rgba(0, 0, 0, 0.3)'}}>SUBJECTS</h1> 
      <Card style={{width: 1300, margin: 'auto', }} className='card px-5   p-3 mb-5 rounded'>
  

        <Table style={{width: 1000, margin: "auto"}} striped responsive className="table-m-2">
          <thead>
            <tr >
              <th>SUBJECTS</th>
              <th style={{textAlign: 'center'}}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {subjects && subjects.map((subject) => (
              <tr key={subject.id}>
                <td>
                  {subject.subject_title} 
                 
                </td>
                                
                <td style={{textAlign: 'center'}}>
                  <Link to={`/subject-edit/${subject.id}`}>
                    <button type="button" className="btn btn-warning me-2">
                    <FontAwesomeIcon icon={ faEdit } />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(subject.id)}
                  >
                   <FontAwesomeIcon icon={ faDeleteLeft } />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      {!showForm ? (
        <Button style={{width: 150, margin: "auto"}} className='btn btn-warning mb-3 mt-5' onClick={toggleForm}>Show Form</Button>  
      ) : (
        <>

<br/><br/>
<Container style={{width: 800, }}>
        
   
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <Form>
              <Button style={{width: 100, textShadow:'2px 2px 2px rgba(0, 0, 0, 0.2)',}} className='btn btn-warning' onClick={toggleForm}>Hide Form</Button>
              <br/><br/>
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
                <div >
              <Button style={{width: 100, marginLeft:330}}
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
              <br/> <br/>
              </div>
            </Form>
            </Container>
        </>
      )}
      </Card>
      </Container>
    </div>
  );
}

export default AddSubject;
