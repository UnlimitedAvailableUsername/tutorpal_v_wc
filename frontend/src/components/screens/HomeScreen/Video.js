import vid from '../../../assets/components/screens/HomeScreen/hero-video.mp4';
import '../../../assets/components/screens/HomeScreen/vid.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const Video = ({ videoRef, aboutRef }) => {
  const scrollOnClick = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
 
  return (
    <div ref={videoRef}>
      <video className='video-bg' playsInline autoPlay muted loop >
        <source src={vid} type="video/mp4" />
      </video>
      <div className='video-text-overlay text-center'>
        <p className="display-1 text-center mb-4">Find an expert tutor</p>
        <h4 className="text-center">1–on–1 lessons with the expert instructor of your choice. <br></br>Meet online. Decide how much you pay and who you <br></br>want to work with. The choice is yours.</h4>
        <Button className='bg-transparent border-0' onClick={() => scrollOnClick(aboutRef.current)}>
          <FontAwesomeIcon icon={faChevronDown} />
        </Button>
      </div>
    </div>
  );
}

export default Video;