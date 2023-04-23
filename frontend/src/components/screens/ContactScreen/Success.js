import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CONTACT_ADD_RESET } from "../../../features/redux/constants/contactConstants";


function Success() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactUsFormState = useSelector((state) => state.contactUsFormState);
  const { data } = contactUsFormState;

  useEffect(() => {
    if (!data) {
      navigate('/')
    };
    dispatch({
      type: CONTACT_ADD_RESET,
    })
  }, [])

  return (
    <div>
      <div className="tutor-bg"></div>
      <div className="tutor-bg-text-overlay text-center">
        <h1 className="text-uppercase mb-5">Your Response Has Been Sent!</h1>
        <h4>
          Thank you for contacting us, your response has been sent and is now
          being processed. Please keep an eye on your provided email in your
          account. The response will be sent there.
        </h4>
        <Button as={Link} to ="/" size="lg" variant="warning" className="btn-outline-dark my-4">
          Go back to Home
        </Button>
      </div>
    </div>
  );
}

export default Success;
