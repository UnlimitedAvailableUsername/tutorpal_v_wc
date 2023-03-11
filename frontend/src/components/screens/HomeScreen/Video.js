import vid from '../../../assets/components/screens/HomeScreen/hero-video.mp4';
import '../../../assets/components/screens/HomeScreen/vid.css'



function Video() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 745,
            behavior: "smooth",
        });
    };

    return (
        <div className='text-light'>
            <video playsinline autoplay="autoplay" muted="muted" loop="loop" className="Video">
                <source src={vid} type="video/mp4" />
            </video>
            <div className="container">
                <p className="topText justify-center">Find an expert tutor</p>
                <p className="sectext">1–on–1 lessons with the expert instructor of your choice. <br></br>Meet online. Decide how much you pay and who you <br></br>want to work with. The choice is yours.</p>
                <div className="button">
                    <i class="fa-solid fa-chevron-down fa-3x bg-none" onClick={scrollToTop}></i>
                </div>
            </div>
        </div>
    )
}

export default Video
