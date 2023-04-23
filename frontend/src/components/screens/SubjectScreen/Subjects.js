import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSubjects } from "../../../features/redux/actions/subjectActions";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button, Container, Table, Card } from "react-bootstrap";
import backgroundImage from "../../../assets/components/screens/ScheduleScreen/secret.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Subjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectList = useSelector((state) => state.subjectList);
  const subjects = subjectList?.subjects;

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "130vh",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={backgroundStyles}>
      <Container>
        <h1 className="text-uppercase my-5 text-center">
         Our Subjects
        </h1>
        <Card className="card px-5 p-3 mb-5 rounded">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th><h3><strong>Name</strong></h3></th>
                <th className="text-center"><h3>View</h3></th>
              </tr>
            </thead>
            <tbody>
              {subjects &&
                subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td><h5>{subject.subject_title}</h5></td>
                    <td className="text-center">
                      <Button as={Link} to={`/subjects/${subject.id}`} className="btn-warning me-2">
                        <FontAwesomeIcon icon={faBars} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}

export default Subjects;
