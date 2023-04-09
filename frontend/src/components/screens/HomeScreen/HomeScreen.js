import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
import HomeAbout from './HomeAbout';
import Section from './Section';
import { useNavigate } from 'react-router';
import HeaderHomePage from '../../elements/HeaderHomePage'

function HomeScreen() {
//ETO PARA DI MAACCESS NG NAKA LOGIN UNG HOMEPAGE ANYMORE
const [userInfo, setUserInfo] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  // Here, you can fetch the user info from an API or a local storage.
  // For this example, let's assume we're fetching it from local storage.
  const storedUserInfo = localStorage.getItem('userInfo');
  setUserInfo(storedUserInfo);
}, []);

  const videoRef = useRef(null);
  const aboutRef = useRef(null);

 // If the user info is not available, redirect to the login page.
 if (userInfo) {
  return  navigate('/profile');
}

// If the user info is available, redirect to their respective profile page.
return (
    <div>
      <HeaderHomePage/>
      <Video videoRef={ videoRef } aboutRef={ aboutRef } />
      <HomeAbout videoRef={ videoRef } aboutRef={ aboutRef } />
      <Section />
    </div>
  );
}

export default HomeScreen