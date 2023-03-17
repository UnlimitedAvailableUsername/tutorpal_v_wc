import React, { useRef } from 'react';
import Video from './Video';
import HomeAbout from './HomeAbout';
import Section from './Section';

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