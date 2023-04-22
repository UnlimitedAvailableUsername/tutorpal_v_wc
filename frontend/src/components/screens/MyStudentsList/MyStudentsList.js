import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyStudentOrders } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Student from "../../elements/StudentOnCard"


function MyStudentsList() {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { students, loading, error } = studentList || {};

  useEffect(() => {
    dispatch(listMyStudentOrders());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <div className="my-5">
          <h1>My students</h1>
        </div>
        {loading ? (
          <LoadingIconBig />
        ) : error ? (
          <MessageAlert variant="danger">{error}</MessageAlert>
        ) : (
          students.map((student) => (
            <Student key={student.id} student={student} />
          ))
        )}
      </Container>
    </div>
  );
}

export default MyStudentsList;
