import { Container } from "react-bootstrap";
import logo from "../../../assets/components/screens/DoesNotExist/404.png"
import background from "../../../assets/components/screens/DoesNotExist/bg.png"

function DoesNotExistScreen() {
  return (
    <div style={{ 
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      minHeight: 'calc(100vh - 16em)',
      padding: '8em 0em 8em 0em',
    }}>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <h1>404 - Not Found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <img alt="404" style={{ height: "18em", width: "36em", position: 'absolute', bottom: '0'  }} src={logo} />
      </Container>
    </div>
  );
}

export default DoesNotExistScreen