import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingIconBig from "../../elements/Loader/LoadingIconBig";
import MessageAlert from "../../elements/MessageAlert";
// import FormContainer from '../components/FormContainer'
import { registerUser } from "../../../features/redux/actions/authUserActions";

function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [file, setFile] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [student, setStudent] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRegisterState = useSelector(state => state.userRegisterState);
	const { loading, error } = userRegisterState

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		first_name: "",
		last_name: "",
		contact: "",
		bio: "",
		active: "true",
		price_rate_hour: "",
		meeting_link: "",
		tutor: false,
		student: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleDropdownChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
			bio: "",
			price_rate_hour: "",
			meeting_link: "",
			tutor: value === "tutor",
			student: value === "student",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault()
        if (!error) {
            dispatch(registerUser(formData));
        }
	}

	return (
		<div>
			<h1>Register</h1>
			<form>
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					First Name:
					<input
						type="text"
						name="first_name"
						value={formData.first_name}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Last Name:
					<input
						type="text"
						name="last_name"
						value={formData.last_name}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Contact:
					<input
						type="text"
						name="contact"
						value={formData.contact}
						onChange={handleInputChange}
					/>
				</label>
				<label>
					Role:
					<select
						name="role"
						value={formData.role}
						onChange={handleDropdownChange}
					>
						<option value="">Select Role</option>
						<option value="tutor">Tutor</option>
						<option value="student">Student</option>
					</select>
				</label>
				{formData.tutor && (
					<>
						<label>
							Bio:
							<input
								type="text"
								name="bio"
								value={formData.bio}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Price Rate per Hour:
							<input
								type="text"
								name="price_rate_hour"
								value={formData.price_rate_hour}
								onChange={handleInputChange}
							/>
						</label>
						<label>
							Meeting Link:
							<input
								type="text"
								name="meeting_link"
								value={formData.meeting_link}
								onChange={handleInputChange}
							/>
						</label>
					</>
				)}
				<button type="submit" onClick={handleSubmit} >Register</button>
			</form>
		</div>
	);
}

export default RegisterScreen;
