import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByOrders } from "../../../features/redux/actions/studentsActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Student from "../../elements/StudentOnCard"
import backgroundImage from '../../../assets/components/screens/ScheduleScreen/secret.png'


function MyStudentsList() {
  const dispatch = useDispatch();

  const studentsListState = useSelector((state) => state.studentsListState);
  const { users, loading, error } = studentsListState;

  useEffect(() => {
    dispatch(getStudentsByOrders());
  }, [dispatch]);

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '280vh',
    backgroundAttachment: 'fixed',
  }; 

  return (
    <div style={backgroundStyles}>
    <style jsx>{`
      .card {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      .one {
        display: flex;
        justify-content: center;
      }
    `}</style>
      <Container>
        <br/><br/>
        <h1 style={{ textAlign: "center", fontSize: 100, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  }}>MY STUDENTS</h1>
      <Card style={{ width: 1300, margin: 'auto',  }} className='card px-5   p-2 mb-1 rounded'>
        <div className="my-2">
       
        </div>
        {loading ? (
          <LoadingIconBig />
        ) : error ? (
          <MessageAlert variant="danger">{error}</MessageAlert>
        ) : (users && users.map((student) => (
            <Student key={student.id} student={student} />
          ))
        )}
        </Card>
      </Container>
    </div>
  );
}

export default MyStudentsList;
