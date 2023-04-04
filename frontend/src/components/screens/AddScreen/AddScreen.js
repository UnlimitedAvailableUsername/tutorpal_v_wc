// import React from "react";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../../../features/redux/actions/productAction";
// import { listsubjects } from "../../../features/redux/actions/subjectActions";

// function AddScreen() {
//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");
//   const [schedule, setSchedule] = useState("");
//   const [rate, setRate] = useState("");

//   const subjectList = useSelector((state) => state.subjectList);
//   const subjects = subjectList?.subjects || [];
 
//   useEffect(() => {
//     dispatch(listsubjects());
//   }, []);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const Post = async () => {
//     let formField = new FormData();

//     formField.append("subject", subject);
//     formField.append("lesson", lesson);
//     formField.append("schedule", schedule);
//     formField.append("rate", rate);

//     dispatch(addProduct(formField)).then((response) => {
//       navigate("/add-lesson");
//     });
//   };

//   return (
//     <div>
//       <div className="text-center" variant="light">
//         <h1>Add Lesson</h1>
//       </div>
//       <Container>
//         <Link
//           to="/LessonList"
//           className="btn btn-warning btn-outline-dark my-3  "
//         >
//           Fuck, Go Back
//         </Link>

//         <Form.Group className="mb-3">
//           <Form.Label></Form.Label>
//           <Form.Control
//             as="select"
//             id="subject"
//             name="subject"
//             className="form-control"
//             placeholder="Please Select"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           >
//             <option value="">--Pick subject--</option>
//             {subjects.map((item) => (
//               <option key={item._id} value={item._id}>
//                 {item.subject_title}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Lesson Name</Form.Label>
//             <Form.Control
//               type="text"
//               id="lesson"
//               name="lesson"
//               className="form-control"
//               value={lesson}
//               onChange={(e) => setLesson(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Schedule</Form.Label>
//             <Form.Control
//               type="text"
//               id="schedule"
//               name="schedule"
//               className="form-control"
//               value={schedule}
//               onChange={(e) => setSchedule(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Rate</Form.Label>
//             <Form.Control
//               type="text"
//               id="rate"
//               name="rate"
//               className="form-control"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//             />
//           </Form.Group>

//           <Button className="btn btn-primary" onClick={Post}>
//             Post Lesson
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// }
// export default AddScreen;
