import React, { useState } from 'react'
import { Button, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addReview } from '../../../features/redux/actions/reviewsActions';
import MessageAlert from '../../elements/MessageAlert';
import RatingClickable from '../../elements/RatingClickable';


const ReviewCreate = ({ review, reviewError, reviewLoading, user, tutorId, toggleEdit, handleToggleEdit }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('user_tutor', parseInt(tutorId));
    formData.append('rating', rating);
    console.log(formData);
    dispatch(addReview(formData));
  }

  return (
    <>
      {user.have_ordered && (
        <ListGroup.Item style={{ backgroundColor: "#404040" }}>
          {toggleEdit ? (
            <>
              <Form onSubmit={handleSubmitReview}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </Form.Group>
                <Row>
                  <RatingClickable value={rating} color={'#f8e825'} setRating={setRating} />
                  <Button type="submit" variant="warning" className='btn-outeline w-50'>
                    {reviewLoading ? (
                      <>
                        <Spinner size="sm"/> Submitting Review
                      </>
                    ): (
                        <>
                          Submit Review
                        </>
                    )}
                  </Button>
                  <Button varaint="light" onClick={handleToggleEdit} className='btn-outline w-50'>Cancel Review</Button>
                </Row>
              </Form>
              {reviewError && (
                <MessageAlert variant="danger">{reviewError}</MessageAlert>
              )}
            </>
          ) : (
            <>
                <Button variant="warning" disabled={user.has_reviewed} onClick={handleToggleEdit} className="btn-outline-dark w-100"><h5>Add My Review</h5></Button>
            </>
          )}
        </ListGroup.Item>
      )}
    </>
  )
}

export default ReviewCreate