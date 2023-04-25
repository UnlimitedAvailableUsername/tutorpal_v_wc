import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listReviewsAdmin, deleteReview, } from "../../../features/redux/actions/adminActions";
import { Table, Dropdown, Row, Col, Button, Container, Card, Form, } from "react-bootstrap";
import backgroundImage from "../../../assets/components/screens/ScheduleScreen/secret.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { REVIEW_DELETE_RESET } from "../../../features/redux/constants/reviewsConstants";

function ReviewList() {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews } = reviewList;

  const adminReviewDeleteState = useSelector((state) => state.adminReviewDeleteState)
  const {success} = adminReviewDeleteState;

  const [deletedReview, setDeletedReview] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(listReviewsAdmin());
    if (success) {
      dispatch(listReviewsAdmin());
    }
    dispatch({
      type: REVIEW_DELETE_RESET,
    })
  }, [dispatch, deletedReview]);

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId));
      setDeletedReview(reviewId);
    }
  };

  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRating, setSelectedRating] = useState("");

  const handleSortOrderChange = (eventKey) => {
    setSortOrder(eventKey);
  };

  const handleRatingChange = (eventKey) => {
    setSelectedRating(eventKey);
  };

  const sortedReviews = reviews
    ?.slice()
    .filter(
      (review) =>
        selectedRating === "" || selectedRating === review.rating.toString()
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.created_date) - new Date(b.created_date);
      } else {
        return new Date(b.created_date) - new Date(a.created_date);
      }
    });

  const filteredReviews = sortedReviews?.filter(
    (review) =>
      review.user_student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user_tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "130vh",
    backgroundAttachment: "fixed",
  };

  return (
    <div style={backgroundStyles}>
      <br />
      <br />
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
        <h1
          style={{
            textAlign: "center",
            fontSize: 100,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          REVIEWS
        </h1>
        <Card
          style={{ width: 1300, margin: "auto" }}
          className="card px-5   p-3 mb-5 rounded  "
        >
          <div className="d-flex justify-content-between">
            <Form.Control
              type="text"
              placeholder="Search by tutor name"
              className="mb-3"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <Row className="my-3">
            <Col className="float-left w-50">
              <Dropdown onSelect={handleRatingChange}>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "#037d50 ",
                    borderColor: "#037d50",
                  }}
                >
                  {selectedRating === "" ? (
                    "Filter by rating"
                  ) : (
                    <>
                      Rating{" "}
                      <span className="selected-rating">{selectedRating}</span>
                    </>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">All</Dropdown.Item>
                  <Dropdown.Item eventKey="1">1 </Dropdown.Item>
                  <Dropdown.Item eventKey="2">2 </Dropdown.Item>
                  <Dropdown.Item eventKey="3">3 </Dropdown.Item>
                  <Dropdown.Item eventKey="4">4 </Dropdown.Item>
                  <Dropdown.Item eventKey="5">5 </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="flex-row-reverse w-50">
              <Dropdown onSelect={handleSortOrderChange}>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "#037d50 ",
                    borderColor: "#037d50",
                  }}
                >
                  Sort by date ({sortOrder === "asc" ? "Oldest" : "Newest"})
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="asc">Oldest</Dropdown.Item>
                  <Dropdown.Item eventKey="desc">Newest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Table className="my-3">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>REVIEWER</th>
                <th>TUTOR</th>
                <th>RATING</th>
                <th>COMMENT</th>
                <th>REVIEW DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews &&
                filteredReviews.map((review) => (
                  <tr style={{ textAlign: "center" }} key={review.id}>
                    <td>{review.user_student}</td>
                    <td>{review.user_tutor}</td>
                    <td>{review.rating}</td>
                    <td>{review.comment}</td>
                    <td>
                      {" "}
                      {new Date(review.created_date).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(review.id)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faDeleteLeft} />
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

export default ReviewList;
