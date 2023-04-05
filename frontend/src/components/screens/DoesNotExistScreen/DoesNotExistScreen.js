import { Container } from "react-bootstrap";

function DoesNotExistScreen() {
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center align-items-center" >
        <h1>404 - Not Found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </Container>
    </div>
  );
}

export default DoesNotExistScreen