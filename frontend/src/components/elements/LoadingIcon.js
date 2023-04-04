import { Spinner } from "react-bootstrap";
import '../../assets/components/elements/LoadingIconBig/spinner.css'
 

function LoadingIconBig() {
    return (
        <Spinner className="spinner-big" animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default LoadingIconBig;