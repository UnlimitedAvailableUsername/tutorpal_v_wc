import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { registerUser } from "../../../features/redux/actions/authUserActions";

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/profile';

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact: "",
    bio: "",
    active: "true",
    price_rate_hour: "",
    meeting_link: "",
    tutor: false,
    student: false,
    subjects: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const isTutor = value === 'tutor';
    setFormData({ ...formData, tutor: isTutor, student: !isTutor });
  };

  const handleSubjectsChange = (e) => {
    const { options } = e.target;
    const subjects = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        subjects.push(options[i].value);
      }
    }
    setFormData({ ...formData, subjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData));
  }

  return (
		<div>
			<h1>Register</h1>
			<form>
				<label>Username:</label>
				<input
					type="username"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
				/>
				<br />
        <label>First Name:</label>
				<input
					type="first_name"
					name="first_name"
					value={formData.first_name}
					onChange={handleInputChange}
				/>
				<br />
        <label>Last Name:</label>
        <input
					type="last_name"
					name="last_name"
					value={formData.last_name}
					onChange={handleInputChange}
				/>
				<br />
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
				/>
				<br />
				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
				/>
				<br />
				<label>Contact:</label>
				<input
					type="text"
					name="contact"
					value={formData.contact}
					onChange={handleInputChange}
				/>
				<br />
				<label>Role:</label>
				<select
					name="tutor"
					value={formData.tutor ? "tutor" : formData.student ? "student" : ""}
					onChange={handleSelectChange}
				>
					<option value="">-- Select Role --</option>
					<option value="tutor">Tutor</option>
					<option value="student">Student</option>
				</select>
				<br />
				{formData.tutor && (
					<div>
						<label>Bio:</label>
						<input
							type="text"
							name="bio"
							value={formData.bio}
							onChange={handleInputChange}
						/>
						<br />
						<label>Price per Hour:</label>
						<input
							type="number"
							name="price_rate_hour"
							value={formData.price_rate_hour}
							onChange={handleInputChange}
						/>
						<br />
						<label>Subjects:</label>
						<select
							multiple
							name="subjects"
							value={formData.subjects}
							onChange={handleSubjectsChange}
						>
							<option value="1">Mathematics</option>
							<option value="2">Language and Literature</option>
							<option value="3">Science</option>
							<option value="4">History</option>
							<option value="5">Others</option>
						</select>
						<br />
						<label>Meeting Link:</label>
						<input
							type="text"
							name="meeting_link"
							value={formData.meeting_link}
							onChange={handleInputChange}
						/>
						<br />
					</div>
				)}
				<button type="submit" onClick={handleSubmit}>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterScreen;
