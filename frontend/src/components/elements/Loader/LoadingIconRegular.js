import { Spinner } from "react-bootstrap";

function LoadingIconRegular() {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default LoadingIconRegular;