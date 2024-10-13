import { useEffect, useState } from 'react';
import { deleteById, listOfCourses } from '../services/CourseService';
import { useNavigate } from 'react-router-dom';

const ListOfCourses = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Добавляем состояние для поиска по преподавателю
    const navigator = useNavigate();

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        listOfCourses()
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setCourses([]);
                }
            })
            .catch((error) => {
                console.error('Error loading courses:', error);
                setCourses([]);
            });
    };

    function addNewCourse() {
        navigator("/addCourse");
    }

    function manageStudents(id) {
        navigator(`/manageCourse/${id}`);
    }

    function editCourse(id) {
        navigator(`/editCourse/${id}`);
    }

    function deleteCourse(id) {
        console.log(`Deleting course with ID: ${id}`);
        deleteById(id)
            .then(() => {
                setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting course:', error);
            });
    }

    // Фильтрация курсов по имени преподавателя
    const filteredCourses = courses.filter(course => 
        course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container mt-5'>
            <h2 className="text-center mb-4">List of Courses</h2>
            <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewCourse}>Add Course</button>
                {/* Поле для поиска по преподавателю */}
                <input
                    type="text"
                    placeholder="Search by teacher"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control w-25"
                />
            </div>
            <table className='table table-striped table-bordered shadow-sm'>
                <thead className="table-light">
                    <tr>
                        <th>Course Title</th>
                        <th>Course Description</th>
                        <th>Course Teacher</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredCourses.length > 0 ? (
                            filteredCourses.map(course =>
                                <tr key={course.id}>
                                    <td>{course.title}</td>
                                    <td>{course.description}</td>
                                    <td>{course.teacher}</td>
                                    <td>
                                        <button className='btn btn-success btn-sm mx-1' onClick={() => manageStudents(course.id)}>Manage Students</button>
                                        <button className='btn btn-warning btn-sm mx-1' onClick={() => editCourse(course.id)}>Edit Course Info</button>
                                        <button className='btn btn-danger btn-sm mx-1' onClick={() => deleteCourse(course.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No courses available</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListOfCourses;
