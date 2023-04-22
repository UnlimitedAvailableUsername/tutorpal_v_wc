import React from 'react'
import LoadingIconBig from '../../elements/Loader/LoadingIconBig'
import { Col, ListGroup, Row } from 'react-bootstrap'
import MessageAlert from '../../elements/MessageAlert'
import Rating from '../../elements/Rating'

const ReviewList = ({reviews, reviewsLoading, reviewsError }) => {
  return (
    <>
      {reviewsLoading ? (
        <ListGroup.Item>
          <LoadingIconBig />
      </ListGroup.Item>
      ): reviewsError ? (
        <ListGroup.Item>
          <MessageAlert variant="danger">{reviewsError}</MessageAlert>
        </ListGroup.Item>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <ListGroup.Item key={review.id} style={{ backgroundColor: "#404040" }}>
            <Row>
              <Col md={2}>
                {review.user_student}
              </Col>
              <Col md={2}>
                <Rating value={review.rating} />
              </Col>
              <Col>
                {review.comment}
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item className="text-center" style={{ backgroundColor: "#404040" }}>
          No reviews yet.
        </ListGroup.Item>
      )}
    </>
  )
}

export default ReviewList