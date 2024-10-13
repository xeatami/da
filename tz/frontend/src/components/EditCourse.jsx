import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getById, editCourse } from '../services/CourseService'

const EditCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teacher, setTeacher] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    getById(id)
        .then((response) => {
            const course = response.data;
            setTitle(course.title);
            setDescription(course.description);
            setTeacher(course.teacher);
        })
      .catch((error) => console.error(error));
    }, [id]);

    const handleUpdateCourse = (e) => {
        e.preventDefault();
        const updatedCourse = { id, title, description, teacher };
        editCourse(updatedCourse)
        .then(() => {
            console.log('Course updated successfully');
            navigate('/courses');
        })
        .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
        <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Edit Course</h2>
            <form onSubmit={handleUpdateCourse}>
            <div className="form-group mb-3">
                <label className="form-label">Title:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">Description:</label>
                <textarea
                className="form-control"
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">Teacher:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter teacher's name"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                />
            </div>
            <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">Update Course</button>
            </div>
            </form>
        </div>
    </div>
  );
};

export default EditCourse;