import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
import HomeAbout from './HomeAbout';
import Section from './Section';
import { useNavigate } from 'react-router';

function HomeScreen() {

  const videoRef = useRef(null);
  const aboutRef = useRef(null);
  
return (
    <div>
      <Video videoRef={ videoRef } aboutRef={ aboutRef } />
      <HomeAbout videoRef={ videoRef } aboutRef={ aboutRef } />
      <Section />
    </div>
  );
}

export default HomeScreen