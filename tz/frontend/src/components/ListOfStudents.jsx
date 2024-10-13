import { useEffect, useState } from 'react';
import { deleteById, listOfStudents } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

const ListOfStudents = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для поиска

    const navigator = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        listOfStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error('Error loading students:', error);
            });
    };

    const addNewStudent = () => {
        navigator("/addStudent");
    };

    const viewProfile = (id) => {
        console.log(id);
        // Здесь вы можете добавить логику для перехода на страницу профиля студента
    };

    const editStudent = (id) => {
        navigator(`/editStudent/${id}`);
    };

    const deleteStudent = (id) => {
        console.log(`Deleting student with ID: ${id}`);
        deleteById(id)
            .then(() => {
                setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting student:', error);
            });
    };

    // Фильтрация студентов на основе поискового запроса
    const filteredStudents = students.filter((student) => 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container'>
            <h2 className="text-center">List Of Students</h2>
            <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewStudent}>Add Student</button>
                {/* Поле для поиска */}
                <input 
                    type="text" 
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control w-25"
                />
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Student First Name</th>
                        <th>Student Last Name</th>
                        <th>Student Email</th>
                        <th>Student Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredStudents.length > 0 ? (
                            filteredStudents.map(student =>
                                <tr key={student.id}>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.birthDate}</td>
                                    
                                    <td>
                                        <button className='btn btn-success btn-sm mx-1' onClick={() => viewProfile(student.id)}>VIEW PROFILE</button>
                                        <button className='btn btn-warning btn-sm mx-1' onClick={() => editStudent(student.id)}>EDIT STUDENT INFO</button>
                                        <button className='btn btn-danger btn-sm mx-1' onClick={() => deleteStudent(student.id)}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No students available</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListOfStudents;
