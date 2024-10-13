import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addStudent } from "../services/StudentService"


const AddStudent = () => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [birthDate, setBirthDate] = useState("");
const [error, setError] = useState('');
const navigator = useNavigate();

function saveStudent(e) {
    e.preventDefault();

    const student = {firstName, lastName, email, birthDate}
    if (!email) {
        setError('Email is required.');
        return;
    }
    addStudent(student).then(response => {
        console.log("Added new student");
        console.log(student);
        console.log(response.data);
        navigator("/students")
    })
}

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <h2 className="text-center mb-4">Add Student</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label">First Name:</label>
                                <input
                                    type='text'
                                    placeholder="Enter student first name"
                                    name="firstName"
                                    value={firstName}
                                    className="form-control"
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type='text'
                                    placeholder="Enter student last name"
                                    name="lastName"
                                    value={lastName}
                                    className="form-control"
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type='email'
                                    placeholder="Enter student email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Birthday:</label>
                                <input
                                    type='date'
                                    name="birthday"
                                    value={birthDate}
                                    className="form-control"
                                    onChange={e => setBirthDate(e.target.value)}
                                />
                            </div>
                            <div className="d-grid mt-4">
                                <button type="button" className="btn btn-primary" onClick={saveStudent}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddStudent