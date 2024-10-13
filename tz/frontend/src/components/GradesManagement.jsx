import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGradesByCourse, addGrade } from '../services/GradeService';
import { listOfAssignedStudents } from '../services/CourseService';

const GradesManagement = () => {
    const { courseId } = useParams(); // courseId из параметров маршрута
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [newGrade, setNewGrade] = useState({
        studentId: '', // studentId для нового студента
        courseId: courseId, // Устанавливаем courseId
        grade: '',
        gradeDate: '',
        comment: ''
    });

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            try {
                const response = await getGradesByCourse(courseId);
                setGrades(response.data);
            } catch (error) {
                setError('Error fetching grades', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAssignedStudents = async () => {
            try {
                const response = await listOfAssignedStudents(courseId);
                setAssignedStudents(response.data);
            } catch (error) {
                setError('Error fetching assigned students', error);
            }
        };

        fetchGrades();
        fetchAssignedStudents();
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGrade({ ...newGrade, [name]: value });
    };

    const handleAddGrade = async (e) => {
        e.preventDefault();
        try {
            // Вставляем courseId для каждого запроса
            const gradeToSubmit = { ...newGrade, courseId: courseId };
            
            await addGrade(gradeToSubmit); // Отправляем запрос с правильной структурой
            setNewGrade({ studentId: '', courseId: courseId, grade: '', gradeDate: '', comment: '' }); // Сброс формы

            // Обновляем список оценок
            const response = await getGradesByCourse(courseId);
            setGrades(response.data);
        } catch (error) {
            console.log(error);
            setError('Error saving grade');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Manage Grades for Course {courseId}</h2>
            {loading && <p>Loading grades...</p>}
            {error && <p className="error">{error}</p>}

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Grade</th>
                        <th>Date</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.length > 0 ? (
                        grades.map((grade) => {
                            const student = assignedStudents.find(student => student.id === grade.id);
                            return (
                                <tr key={grade.gradeId}>
                                    <td>{student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</td>
                                    <td>{grade.grade}</td>
                                    <td>{new Date(grade.gradeDate).toLocaleDateString()}</td>
                                    <td>{grade.comment || 'No comment'}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4">No grades available for this course.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h3 className="text-center mb-4">Add New Grade</h3>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleAddGrade}>
                                <div className="mb-3">
                                    <label htmlFor="studentId" className="form-label">Select Student</label>
                                    <select
                                        className="form-select"
                                        name="studentId"
                                        value={newGrade.studentId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select a student</option>
                                        {assignedStudents.map(student => (
                                            <option key={student.id} value={student.id}>
                                                {student.firstName} {student.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="grade" className="form-label">Grade</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="grade"
                                        name="grade"
                                        value={newGrade.grade}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gradeDate" className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="gradeDate"
                                        name="gradeDate"
                                        value={newGrade.gradeDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comment" className="form-label">Comment</label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        name="comment"
                                        value={newGrade.comment}
                                        onChange={handleInputChange}
                                        placeholder="Enter any comments here"
                                    />
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">Add Grade</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradesManagement;
