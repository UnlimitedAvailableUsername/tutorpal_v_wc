import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Rating from "./Rating";


function Tutor({ user, subjectId }) {
	const location = useLocation();

	const urlPath = subjectId ? `tutors/${user.id}` : `${user.id}`;

	return (
		<Row>
			<Card style={{ backgroundColor: "#404040" }} className=" my-2 p-3 rounded">
				<Link to={urlPath} style={{ color: "#fafafa", textDecoration: "none" }}>
					<Row className="justify-content-center">
						<Col md={3}>
							<Card.Img style={{ width: 250, height: 250, objectFit: 'cover' }} src={`${user.profile_picture}`} />
						</Col>
						<Col md={9}>
							<Card.Body>
								<Card.Title>
									<h3>
										<strong>
											{(user.first_name && user.last_name) ? (
												<div>
													{user.first_name}&nbsp;{user.last_name}
												</div>
											) : (
												<div className="text-muted">
													Unknown Name
												</div>
											)}
										</strong>
									</h3>
								</Card.Title>
								<Card.Text>
									<div>
										<strong>Subjects Handling:</strong>&nbsp;&nbsp;
										{user.subjects.map(subject => subject.subject_title).join(",   ")}
									</div>
								</Card.Text>

								<Card.Text style={{ color: "#D3D3D3" }}>
									<div>
										{user.bio.length > 199 ? (
											<>
												{user.bio}
												<span>...</span><Link to={urlPath} style={{ color: "#f8e825" }}>
													Read More
												</Link>
											</>
										) : (
											<>
												{user.bio}
											</>
										)}
									</div>
								</Card.Text>

								<Card.Text as="div">
									<div className="my-3">
										<Rating
											value={user.rating}
											text={`${user.numReviews} reviews`}
											color={"#f8e825"}
										/>
									</div>
								</Card.Text>

								<Card.Text as="h3">₱&nbsp;{parseFloat(user.price_rate_hour).toFixed(2)}</Card.Text>
							</Card.Body>
						</Col>
					</Row>
				</Link>
			</Card>
		</Row>
	);
}

export default Tutor;
