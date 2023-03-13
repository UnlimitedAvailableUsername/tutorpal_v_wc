import React from 'react'
import { Container, Table, } from "react-bootstrap";
import { faHouseSignal, faChalkboard, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Section() {
  return (
    <div className='bg-dark'>
      <Container>
        <Table className='text-white table-borderless'>
          <thead>

            <tr>
              <th scope="col">
                <FontAwesomeIcon style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faHouseSignal} size='3x'/>
              </th>

              <th scope="col">
                <FontAwesomeIcon style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faChalkboard} size='3x'/>
              </th>

              <th scope="col">
                <FontAwesomeIcon style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faUser} size='3x'/>
              </th>

              <th scope="col">
                <FontAwesomeIcon style={{ width: '100%' }} className="mb-1 mt-5 justify-content-center" icon={faUserShield} size='3x'/>
              </th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>
               <h3 style={{ marginTop: 30, }} className="text-center font-weight-bold">100% Online</h3>
              </td>
              <td>
                <h3 style={{ marginTop: 30, }} className="text-center font-weight-bold">Dedicated & Competent Tutors</h3>
              </td>
              <td>
                <h3 style={{ marginTop: 30, }} className="text-center font-weight-bold">Specific Mentoring</h3>
              </td>
              <td>
                <h3 style={{ marginTop: 30, }} className="text-center font-weight-bold">Safe Online Learning Environment</h3>
              </td>
            </tr>

            <tr>
              <td>
                <h6 className="text-center font-weight-bold">Easily access our user-friendly study materials via our trusted online platform — from home or anywhere.</h6>
              </td>
              <td>
               <h6 className="text-center font-weight-bold">Our tutors are in our team because of their competence and love for personalized teaching.</h6>
              </td>
              <td>
                <h6 className="text-center font-weight-bold">We work closely with you to effectively address learning gaps and propel progress.</h6>
              </td>
              <td>
                <h6 className="text-center font-weight-bold">Our hub is a space where you are free to express yourselves, ask questions, and explore your strengths and possibilities.</h6>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Section;
