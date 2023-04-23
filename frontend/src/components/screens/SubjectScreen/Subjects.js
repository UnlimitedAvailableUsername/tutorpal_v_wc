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
        <style jsx>{`
          .card {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          }

          .one {
            display: flex;
            justify-content: center;
          }
        `}</style>
        <h1
          style={{
            textAlign: "center",
            fontSize: 100,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          SUBJECTS
        </h1>
        <Card
          style={{ width: 1300, margin: "auto" }}
          className="card px-5   p-3 mb-5 rounded"
        >
          <Table
            style={{ width: 1000, margin: "auto" }}
            striped
            responsive
            className="table-m-2"
          >
            <thead>
              <tr>
                <th>SUBJECTS</th>
                <th style={{ textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {subjects &&
                subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.subject_title}</td>

                    <td style={{ textAlign: "center" }}>
                      <Link to={`/tutors/${subject.id}`}>
                        <button type="button" className="btn btn-warning me-2">
                          <FontAwesomeIcon icon={faBars} />
                        </button>
                      </Link>
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
