import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditMode from './EditMode';
import { Container } from 'react-bootstrap';
import PreviewMode from './PreviewMode';
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';
import MessageAlert from '../../elements/MessageAlert';
import '../../../assets/components/screens/ProfileScreen/ProfileScreen.css';
import { USER_PROFILE_UPDATE_SUCCESS_DELAY } from '../../../features/redux/actions/authUserActions';


const ProfileScreen = () => {

  const { userInfo } = useSelector((state) => state.userState);
  const { subjects, loading: subjectsLoading, error: subjectsError } = useSelector((state) => state.subjectList);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.userUpdateProfileState);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      setDisableButton(true);
      setTimeout(() => {
        setDisableButton(false);
      }, USER_PROFILE_UPDATE_SUCCESS_DELAY); // delay the button
    }
  }, [updateSuccess]);

  const handleToggleEdit = () => {
    setToggleEdit(prevState => !prevState);
  };

  return (
    <Container>
      <>
        {updateSuccess && (
          <MessageAlert variant="success">Profile successfully updated!</MessageAlert>
        )}
      </>
      <>
        {updateError && (
          <MessageAlert variant="danger"></MessageAlert>
        )}
      </>
      <>
        {updateLoading && (
          <LoadingIconBig />
        )}
      </>
      <>
        {toggleEdit ? (
          <EditMode
            userInfo={userInfo}
            subjects={subjects}
            subjectsError={subjectsError}
            subjectsLoading={subjectsLoading}
            updateSuccess={updateSuccess}
            updateError={updateError}
            handleToggleEdit={handleToggleEdit}
          />
        ) : (
          <PreviewMode
            userInfo={userInfo}
            disableButton={disableButton}
            handleToggleEdit={handleToggleEdit}
          />
        )}
      </>
    </Container>
  );
};

export default ProfileScreen;
