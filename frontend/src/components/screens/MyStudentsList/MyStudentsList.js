import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByOrders } from "../../../features/redux/actions/studentsActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import Student from "../../elements/StudentOnCard"


function MyStudentsList() {
  const dispatch = useDispatch();

  const studentsListState = useSelector((state) => state.studentsListState);
  const { users, loading, error } = studentsListState;

  useEffect(() => {
    dispatch(getStudentsByOrders());
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
        ) : (users && users.map((student) => (
            <Student key={student.id} student={student} />
          ))
        )}
      </Container>
    </div>
  );
}

export default MyStudentsList;
