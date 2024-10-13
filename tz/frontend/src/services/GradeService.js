import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/grades';

export const getGradesByCourse = (courseId) => axios.get(`${REST_API_URL}/course/${courseId}`);

export const getGradeByStudentAndCourse = (studentId, courseId) => axios.get(`${REST_API_URL}/student/${studentId}/course/${courseId}`);

export const getGradesByStudent = (studentId) => axios.get(`/api/grades/student/${studentId}`);

export const addGrade = (grade) => axios.post(`${REST_API_URL}/add`, grade);

export const updateGrade = (id, gradeDetails) => axios.put(`${REST_API_URL}/update/${id}`, gradeDetails);

export const deleteGradeById = (gradeId) => axios.delete(`${REST_API_URL}/${gradeId}`);
