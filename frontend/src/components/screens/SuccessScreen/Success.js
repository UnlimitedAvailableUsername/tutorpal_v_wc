import React from 'react'
import { Link } from 'react-router-dom'
function Success() {
  return (
   <center>
  <div className="tutor-bg"></div>
      <div className="tutor-bg-text-overlay text-center">
        <h1 className="text-uppercase tutor-text-h1">Your Response Has Been Sent!!</h1>
        <h4>
          Thank you for contacting us, your response has been sent and is now being processed. Please keep an eye on your provided email in your account. The response will be sent there.
        
        </h4>

        <Link
          to="/"
          className="btn btn-warning btn-lg btn-outline-dark my-4 "
        >
        Go Back
        </Link>

        
      </div>
</center>



  )
}

export default Success