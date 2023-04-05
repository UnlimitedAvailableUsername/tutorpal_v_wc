import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { listTutors } from "../../../features/redux/actions/tutorActions";
import { Row, Col, Container } from "react-bootstrap";
import Tutor from "../../elements/TutorOnCard";
import "../../../assets/components/screens/TutorListScreen/tutorlist.css";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";

function TutorListScreen() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const tutorList = useSelector((state) => state.tutorList);
  const { loading, error, users } = tutorList;

  useEffect(() => {
    dispatch(listTutors());
  }, [dispatch]);
  return (
		<div>
			<div className="tutor-bg"></div>
			<div className="tutor-bg-text-overlay text-center">
				<h1 className="text-uppercase tutor-text-h1">our tutors</h1>
				<h4>
					Click on each tutor's profile to learn more about the tutor's
					education background and experience.
				</h4>
			</div>
			<Container>
				<Form>
					<Container className="my-5">
						<Form.Control
							className="shadow"
							onChange={(e) => setSearch(e.target.value)}
							type="search"
							placeholder="Search for Tutors"
							aria-label="Search"
						/>
					</Container>
				</Form>

				{loading ? (
					<LoadingIconBig />
				) : error ? (
					<MessageAlert variant="danger">{error}</MessageAlert>
				) : (
					<div>
						<Row>
							{users.map((user) => (
								<Col key={user.id} sm={12} md={6} xl={12}>
									<Tutor user={user} />
								</Col>
							))}
						</Row>
						{users.filter((user) => user.tutor).length === 0 && (
							<div className="text-center my-5">
								<h4>No Tutors available</h4>
							</div>
						)}
					</div>
				)}
			</Container>
		</div>
	);
}

export default TutorListScreen;
