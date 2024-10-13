// import { useEffect, useState } from 'react';
// import { listOfStudents } from '../services/StudentService';
// import { listOfCourses, assignStudentToCourse, removeStudentFromCourse } from '../services/CourseService';
// import { useParams, useNavigate } from 'react-router-dom';

// const AssignStudentToCourse = () => {
//     const { id } = useParams(); // Получаем id курса из параметров URL
//     const navigate = useNavigate();
    
//     const [students, setStudents] = useState([]);
//     const [course, setCourse] = useState(null);
//     const [assignedStudents, setAssignedStudents] = useState([]);

//     useEffect(() => {
//         const fetchStudentsAndCourse = async () => {
//             try {
//                 // Получаем всех студентов
//                 const studentResponse = await listOfStudents();
//                 setStudents(studentResponse.data);

//                 // Получаем курс по ID
//                 const courseResponse = await listOfCourses();
//                 const currentCourse = courseResponse.data.find(course => course.id === Number(id));
//                 setCourse(currentCourse);

//                 // Устанавливаем уже привязанных студентов
//                 setAssignedStudents(currentCourse.students.map(student => student.id) || []);
//             } catch (error) {
//                 console.error("Ошибка при загрузке данных:", error);
//             }
//         };

//         fetchStudentsAndCourse();
//     }, [id]);

//     const handleAssignStudent = async (studentId) => {
//         try {
//             await assignStudentToCourse(studentId, id);
//             setAssignedStudents(prev => [...prev, studentId]); // Добавляем студента в список привязанных
//         } catch (error) {
//             console.error("Ошибка при привязке студента:", error);
//         }
//     };

//     const handleRemoveStudent = async (studentId) => {
//         try {
//             await removeStudentFromCourse(id, studentId);
//             setAssignedStudents(prev => prev.filter(student => student !== studentId)); // Удаляем студента из списка привязанных
//         } catch (error) {
//             console.error("Ошибка при отвязке студента:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Привязка студентов к курсу: {course?.name}</h2>
//             <h3>Доступные студенты:</h3>
//             <ul>
//                 {students.map(student => (
//                     <li key={student.id}>
//                         {student.firstName} {student.lastName}
//                         {assignedStudents.includes(student.id) ? (
//                             <button onClick={() => handleRemoveStudent(student.id)}>Отвязать</button>
//                         ) : (
//                             <button onClick={() => handleAssignStudent(student.id)}>Привязать</button>
//                         )}
//                     </li>
//                 ))}
//             </ul>

//             <h3>Привязанные студенты:</h3>
//             <ul>
//                 {assignedStudents.map(studentId => {
//                     const student = students.find(s => s.id === studentId);
//                     return (
//                         <li key={studentId}>
//                             {student.firstName} {student.lastName}
//                             <button onClick={() => handleRemoveStudent(studentId)}>Отвязать</button>
//                         </li>
//                     );
//                 })}
//             </ul>

//             <button onClick={() => navigate('/courses')}>Назад к курсам</button>
//         </div>
//     );
// };

// export default AssignStudentToCourse;
