import vid from '../../../assets/components/screens/HomeScreen/hero-video.mp4';
import '../../../assets/components/screens/HomeScreen/vid.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Button } from 'react-bootstrap';


function Video() {

    const scrollToBottom = () => {
        window.scrollTo({
            top: 745,
            behavior: "smooth",
        });
    };

    return (
        <div>
            <video className='video-bg' playsInline autoPlay="autoplay" muted="muted" loop="loop" preload="auto">
                <source src={vid} type="video/mp4" />
            </video>
            <div className='video-text-overlay text-center'>
                <h1 className="text-center mb-4">Find an expert tutor</h1>
                <p className="text-center">1–on–1 lessons with the expert instructor of your choice. <br></br>Meet online. Decide how much you pay and who you <br></br>want to work with. The choice is yours.</p>
                <Button className='bg-transparent border-0'>
                    <FontAwesomeIcon icon={ faChevronDown } onClick={scrollToBottom} />
                </Button>
            </div>
        </div>
    )
}

export default Video
