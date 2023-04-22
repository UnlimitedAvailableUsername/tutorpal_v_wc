import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listReviewsAdmin, deleteReview } from "../../../features/redux/actions/adminActions";
import { Table, Dropdown, Row, Col, Button } from "react-bootstrap";

function ReviewList() {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews } = reviewList;

  const [deletedReview, setDeletedReview] = useState(null);

  useEffect(() => {
    dispatch(listReviewsAdmin());
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
    .filter((review) => selectedRating === "" || selectedRating === review.rating.toString())
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.created_date) - new Date(b.created_date);
      } else {
        return new Date(b.created_date) - new Date(a.created_date);
      }
    });

  return (
    <div>
    <h2 style={{ margin: "20px 0", textAlign: "center" }}>Reviews</h2>
  
    <Row style={{ margin: "10px 0" }}>
      <Col>
        <Dropdown onSelect={handleRatingChange}>
        <Dropdown.Toggle
  id="dropdown-basic"
  style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
>
  {selectedRating === "" ? (
    "Filter by rating"
  ) : (
    <>
      Rating <span className="selected-rating">{selectedRating}</span>
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
      <Col>
        <Dropdown onSelect={handleSortOrderChange}>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ backgroundColor: "#037d50 ", borderColor: "#037d50" }}
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
  
    <Table style={{ margin: "auto" }}>
      <thead>
        <tr>
          <th>Reviewer</th>
          <th>Tutor</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Review Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {sortedReviews && sortedReviews.map((review) => (
  <tr key={review.id}>
    <td>{review.user_student}</td>
    <td>{review.user_tutor}</td>
    <td>{review.rating}</td>
    <td>{review.comment}</td>
    <td>{new Date(review.created_date).toLocaleDateString()}</td>
    <td>
    <Button variant="danger" onClick={() => handleDelete(review.id)}>Delete</Button>

    </td>
  </tr>
))}

      </tbody>
    </Table>
  </div>
  

);
}

export default ReviewList;


