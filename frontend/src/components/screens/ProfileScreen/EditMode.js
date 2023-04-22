import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../features/redux/actions/authUserActions';
import { listSubjects } from '../../../features/redux/actions/subjectActions';
import { Button, Form, Spinner } from 'react-bootstrap';
import LoadingIconRegular from '../../elements/Loader/LoadingIconRegular';
import MessageAlert from '../../elements/MessageAlert';
import { USER_UPDATE_PROFILE_FAIL } from '../../../features/redux/constants/authUserConstants';
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';


const EditMode = ({ userInfo, subjects, subjectsLoading, subjectsError, updateSuccess, handleToggleEdit }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(userInfo.username);
  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [contact, setContact] = useState(userInfo.contact);
  const [bio, setBio] = useState(userInfo.bio);
  const [hourlyPriceRate, setHourlyPriceRate] = useState(userInfo.price_rate_hour);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(
    userInfo.subjects.map((subject) => subject.id)
  );
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.profile_picture) {
      if (typeof userInfo.profile_picture === 'string') { // check if it's already a URL
        setImageUrl(userInfo.profile_picture);
      } else {
        setImageUrl(URL.createObjectURL(userInfo.profile_picture)); // create URL for the current profile picture
      }
    };
    if (updateSuccess) {
      handleToggleEdit();
    }
  }, [userInfo, updateSuccess, handleToggleEdit]);

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordConfirm !== password) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: "Password do not match!"
      });
    } else {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      if (password) {
        formData.append('password', password);
      }
      formData.append('email', email);
      formData.append('contact', contact);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }
      if (userInfo.tutor) {
        formData.append('bio', bio);
        formData.append('price_rate_hour', hourlyPriceRate);
        selectedSubjects.forEach(subjectId => {
          formData.append('subjects', subjectId);
        });
      }
      console.log(formData);
      dispatch(updateUserProfile(formData));
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 2097152) { // 2 MB
      alert("File size is too large. Maximum file size is 2 MB.");
      event.target.value = null;
      return;
    }
    setProfilePicture(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSelectedSubjectsChange = (event) => {
    const subjectId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedSubjects((prevState) => [...prevState, subjectId]);
    } else {
      setSelectedSubjects((prevState) =>
        prevState.filter((id) => id !== subjectId)
      );
    }
  };

  return (
    <div>
      <Button onClick={handleToggleEdit}>Cancel Edit</Button>
      <h1>{userInfo.username}'s Profile</h1>
      <Form onSubmit={handleSubmit}>
        <>
          {userInfo.tutor && (
            <div>
              <h2>Basic Details:</h2>
            </div>
          )}
        </>
        <Form.Group controlId="profilePicture">
          <div>
            {imageUrl && <img src={imageUrl} alt="Profile" />}
          </div>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Change Password</Form.Label>
          <Form.Control
            type="password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='contact'>
          <Form.Label>Contact Details</Form.Label>
          <Form.Control
            type="contact"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </Form.Group>
        {userInfo.tutor && (
          <>
            <h2>Tutor Specific Details:</h2>
            <Form.Group controlId='bio'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="subjects">
              <Form.Label>Select your subjects</Form.Label>
              {subjects && (
                subjectsLoading ? (
                  <>
                    <div><Spinner/>&nbsp;Loading available subjects...</div>
                  </>
                ) : subjectsError ? (
                  <>
                    <MessageAlert variant="danger">{subjectsError}</MessageAlert>
                  </>
                ) : (
                  <>
                    {subjects.map((subject) => (
                      <div key={subject.id}>
                        <Form.Check
                          type="checkbox"
                          id={`subject-${subject.id}`}
                          label={subject.subject_title}
                          checked={selectedSubjects.includes(subject.id)}
                          value={subject.id}
                          onChange={handleSelectedSubjectsChange}
                        />
                      </div>
                    ))}
                  </>
                )
              )}
            </Form.Group>
          </>
        )}
        <Button variant="warning" type="submit">Save Changes</Button>
      </Form>
    </div>
  )
}

export default EditMode