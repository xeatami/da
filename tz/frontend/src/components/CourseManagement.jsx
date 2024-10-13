import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listOfAssignedStudents } from '../services/CourseService';
import { unassignCourse, assignCourse, getUnassignedStudents } from '../services/StudentService';

const CourseManagement = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [unassignedStudents, setUnassignedStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    
    useEffect(() => {
        fetchStudents();
        fetchUnassignedStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const fetchUnassignedStudents = async () => {
        try {
            const response = await getUnassignedStudents();
            setUnassignedStudents(response.data); // Данные студентов, не назначенных на курсы
        } catch (error) {
            setError('Failed to load unassigned students.', error);
        }
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await listOfAssignedStudents(courseId);
            setStudents(response.data); // Данные студентов, назначенных на текущий курс
        } catch {
            setError('Failed to load students.');
        } finally {
            setLoading(false);
        }
    };

    const handleUnassignStudent = async (studentId) => {
        try {
            await unassignCourse(studentId, courseId);
            setSuccessMessage('Student unassigned successfully.');
            setStudents(students.filter(student => student.id !== studentId)); // Обновляем список студентов
            fetchUnassignedStudents(); // Обновляем список студентов, которых можно привязать
        } catch (error) {
            setError('Error unassigning student.', error);
        }
    };

    const handleAddStudent = async () => {
        try {
            await assignCourse(selectedStudentId, courseId); // Привязываем выбранного студента к курсу
            setSuccessMessage('Student assigned successfully.');
            setShowAddStudentModal(false);
            setSelectedStudentId(''); // Сбрасываем выбранного студента
            fetchStudents(); // Обновляем список студентов
            fetchUnassignedStudents(); // Обновляем список студентов, которых можно привязать
        } catch (error) {
            setError('Error assigning student.', error);
        }
    };

    const toggleAddStudentModal = () => setShowAddStudentModal(!showAddStudentModal);

    if (loading) return <div className="spinner-border" role="status"><span className="sr-only"></span></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h2>Students in this Course</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="row">
                {students.length > 0 ? (
                    students.map(student => (
                        <div className="col-md-4 mb-4" key={student.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{student.firstName} {student.lastName}</h5>
                                    <p>Email: {student.email}</p>
                                    <button className="btn btn-danger" onClick={() => handleUnassignStudent(student.id)}>
                                        Unassign
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No students assigned to this course.</p>
                )}
            </div>

            <button className="btn btn-primary mt-4" onClick={toggleAddStudentModal}>
                Add Student to This Course
            </button>

            {/* Модальное окно для добавления студента */}
            {showAddStudentModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Student to Course</h5>
                                <button type="button" className="close" onClick={toggleAddStudentModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <select 
                                    value={selectedStudentId} 
                                    onChange={(e) => setSelectedStudentId(e.target.value)} 
                                    className="form-control"
                                >
                                    <option value="">Select a student</option>
                                    {unassignedStudents.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleAddStudentModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleAddStudent} disabled={!selectedStudentId}>
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="btn btn-info mt-4" onClick={() => navigate(`/course/${courseId}/grades`)}>
                Edit Grades for This Course
            </button>
        </div>
    );
};

export default CourseManagement;
