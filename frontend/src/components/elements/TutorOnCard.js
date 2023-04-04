import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Tutor({ user }) {

  const subjectNamesById = {
    1: "Mathematics",
    2: "Science",
    3: "English",
    4: "History",
    // add more subject IDs and names here
  };

  return (
		<Row>
			<Card
				style={{ backgroundColor: "#404040" }}
				className="my-10 p-3 rounded"
			>
				<Row>
					<Col>
						<Link to={`tutor/${user.id}`}>
							<Card.Img
								className="img-responsive"
								style={{ width: "auto", height: "16em" }}
								src={`${user.profile_picture}`}
							/>
						</Link>
					</Col>
					<Col>
						<Card.Body>
							<Link to={`tutor/${user.id}`}>
								<Card.Title>
									<strong>
										{user.first_name} {user.last_name}
									</strong>
								</Card.Title>
							</Link>
							<Card.Text as="div">
								<div>
                  <strong>Main Subject:</strong>{" "}
                  {user.subjects.map((subjectId, index) => (
                    <span key={subjectId}>
                      {subjectNamesById[subjectId]}
                      {index < user.subjects.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  <br></br>{" "}
                </div>
							</Card.Text>

							<Card.Text style={{ color: "#D3D3D3" }}>
								<div>
									{user.bio.slice(0, 200)}
									{user.bio.length > 200 ? <span>...</span> : null}
								</div>
								{user.bio.length > 200 ? (
									<Link to={`tutor/${user.id}`} style={{ color: "#f8e825" }}>
										Read More
									</Link>
								) : null}
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

							<Card.Text as="h3">₱ {user.price_rate_hour}/hr</Card.Text>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</Row>
	);
}
  
export default Tutor;