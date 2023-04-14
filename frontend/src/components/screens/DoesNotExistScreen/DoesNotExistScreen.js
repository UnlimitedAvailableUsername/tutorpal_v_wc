import { Container } from "react-bootstrap";
import logo from "../../../assets/components/screens/DoesNotExist/404.png"

function DoesNotExistScreen() {
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center align-items-center" >
        <h1>404 - Not Found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
		<img alt="404" style={{ height: "18em", width: "18em" }} src={logo} />
      </Container>
    </div>
  );
}

export default DoesNotExistScreen