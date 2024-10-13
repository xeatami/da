import axios from "axios"

const REST_API_URL = 'http://localhost:8080/students'

export const listOfStudents = () => axios.get(`${REST_API_URL}/all`)

export const getById = (id) => axios.get(`${REST_API_URL}/${id}`)

export const getStudentsByCourse = (courseId) => {return axios.get(`${REST_API_URL}/course/${courseId}`);};

export const getUnassignedStudents = () => axios.get(`${REST_API_URL}/unassigned`)

export const addStudent = (student) => axios.post(REST_API_URL, student)

export const editStudent = (student) => axios.put(`${REST_API_URL}/editStudent`, student)

export const deleteById = (id) => axios.delete(`${REST_API_URL}/${id}`)

export const assignCourse = (studentId, courseId) => axios.put(`${REST_API_URL}/${studentId}/assignCourse/${courseId}`)

export const unassignCourse = (studentId, courseId) => axios.put(`${REST_API_URL}/${studentId}/unassignCourse/${courseId}`)