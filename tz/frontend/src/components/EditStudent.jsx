import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, editStudent } from '../services/StudentService';

const EditStudent = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [courseId, setCourseId] = useState(''); // Add state for courseId
    const navigate = useNavigate();

    useEffect(() => {
        getById(id)
            .then((response) => {
                const student = response.data;
                setFirstName(student.firstName);
                setLastName(student.lastName);
                setEmail(student.email);
                setBirthDate(student.birthDate);
                setCourseId(student.courseId); // Assuming student has a courseId property
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        const updatedStudent = { id, firstName, lastName, email, birthDate, courseId }; // Include courseId in the update
        editStudent(updatedStudent)
            .then(() => {
                console.log('Student updated successfully');
                navigate('/students');
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2 className="text-center mb-4">Edit Student</h2>
                <form onSubmit={handleUpdateStudent}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Date of Birth:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">Update Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;
