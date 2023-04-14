import { Spinner } from "react-bootstrap";
<<<<<<< HEAD:frontend/src/components/elements/LoadingIcon.js
import '../../assets/components/elements/LoadingIconBig/spinner.css'
 
=======
import '../../../assets/components/elements/LoadingIcon/spinner.css'

>>>>>>> master:frontend/src/components/elements/Loader/LoadingIconBig.js

function LoadingIconBig() {
    return (
        <Spinner className="spinner-big" animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default LoadingIconBig;