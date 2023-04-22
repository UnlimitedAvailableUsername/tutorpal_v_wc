import React from 'react';
import { Button } from 'react-bootstrap';

const PreviewMode = ({ disableButton, userInfo, handleToggleEdit }) => {

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <img src={userInfo.profile_picture} alt={userInfo.username} />
      </div>
      <div>
        <h2>Username</h2>
        <p>{userInfo.username}</p>
      </div>
      <div>
        <h2>First Name</h2>
        <p>{userInfo.first_name}</p>
      </div>
      <div>
        <h2>Last Name</h2>
        <p>{userInfo.last_name}</p>
      </div>
      <div>
        <h2>Email</h2>
        <p>{userInfo.email}</p>
      </div>
      <div>
        <h2>Contact Details:</h2>
        <p>{userInfo.contact}</p>
      </div>
      {userInfo.tutor && (
        <>
          <div>
            <h2>Bio</h2>
            <p>{userInfo.bio ? (
              <>
                {userInfo.bio}
              </>
            ) : (
                <>
                  You haven't set your Bio. Add now so students can know more about you!
                </>
            )}</p>
          </div>
          <div>
            <h2>Hourly Price</h2>
            <p>{parseFloat(userInfo.price_rate_hour).toFixed(2)}</p>
          </div>
          <div>
            <h2>Subjects</h2>
            {userInfo.subjects.map((subject) => (
              <div key={subject.id}>
                <li>{subject.subject_title}</li>
              </div>
            ))}
          </div>
        </>
      )}
      <Button variant="warning" onClick={handleToggleEdit} disabled={disableButton}>Edit</Button>
    </div>
  )
}

export default PreviewMode;