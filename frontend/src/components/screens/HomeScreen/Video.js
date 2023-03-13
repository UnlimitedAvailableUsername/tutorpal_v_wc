import vid from '../../../assets/components/screens/HomeScreen/hero-video.mp4';
import '../../../assets/components/screens/HomeScreen/vid.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Button } from 'react-bootstrap';


function Video() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 745,
            behavior: "smooth",
        });
    };

    return (
        <div className='text-light'>
            <video playsInline autoPlay="autoplay" muted="muted" loop="loop" className="Video" preload="auto">
                <source src={vid} type="video/mp4" />
            </video>
            <Container>
                <p className="topText justify-center">Find an expert tutor</p>
                <p className="sectext">1–on–1 lessons with the expert instructor of your choice. <br></br>Meet online. Decide how much you pay and who you <br></br>want to work with. The choice is yours.</p>
                <Button>
                    <FontAwesomeIcon icon={ faChevronDown } onClick={scrollToTop} />
                </Button>
            </Container>
        </div>
    )
}

export default Video
