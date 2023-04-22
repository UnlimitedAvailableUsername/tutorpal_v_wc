import React, { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listMyStudentOrders } from "../../../features/redux/actions/tutorActions";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Student from "../../elements/StudentOnCard"


function MyStudentsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  const studentList = useSelector((state) => state.studentList);
  const { students, loading, success, error } = studentList || {};

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=${location.pathname}`);
    } else if (students.length === 0 && !loading && !success && !error) {
      dispatch(listMyStudentOrders());
    }
  }, [dispatch, navigate, location, userInfo, students, loading, success, error]);

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
