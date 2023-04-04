import { Card, Container, Row, Col } from 'react-bootstrap';
import image from '../AboutScreen/ABOUT.png'
import HeaderHome from '../../elements/HeaderHomePage'
import HeaderTutor from '../../elements/HeaderTutor'
import HeaderStudent from '../../elements/HeaderStudent'
import { useSelector } from 'react-redux';

function AboutUs() {
  const userLogin = useSelector((state) => state.userState);
  const { userInfo } = userLogin;

  const members = [
    {
      name: 'Manuel Mendez',
      image: { src: image },
      email: 'jane.doe@example.com'
    },
    {
      name: 'Marc Joshua Beltran',
      image: { src: image },
      email: 'jane.doe@example.com'
    },
    {
      name: 'Mark Railey Generoso',
      image: { src: image },
      email: 'jane.doe@example.com'
    },
    {
      name: 'Jan Russel Laxa',
      image: { src: image },
      email: 'jane.doe@example.com'
      },
      {
        name: 'Timothy Asuncion',
        image: { src: image },
        email: 'jane.doe@example.com'
      },
      {
        name: 'Darren Gana',
        image: { src: image },
        email: 'jane.doe@example.com'
      }
  ];

  return (

    <>
    {userInfo && (userInfo.tutor || userInfo.user?.tutor) && (
      <HeaderTutor/>
    ) }

    {userInfo && (userInfo.student || userInfo.user?.student) && (
      <HeaderStudent/>
    ) }

{!userInfo && <HeaderHome />}


<Container>
<br></br>
<h2>About Us</h2> <br></br>
<h5>WE ARE THE CREATORS!</h5>
      <Row>
        {members.map((member, index) => (
          <Col md={4} key={index}>
            <Card className="my-3 p-3 rounded">
              <Card.Img src={member.image.src} alt={member.image.alt || member.name} variant="top" />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}
export default AboutUs