import axios from "axios"

const REST_API_URL = 'http://localhost:8080/courses'

export const listOfCourses = () => axios.get(`${REST_API_URL}/all`)

export const getById = (id) => axios.get(`${REST_API_URL}/${id}`)

export const addCourse = (course) => axios.post(REST_API_URL, course)

export const editCourse = (course) => axios.put(`${REST_API_URL}/editCourse`, course)

export const deleteById = (id) => axios.delete(`${REST_API_URL}/${id}`)

export const listOfAssignedStudents = (courseId) => axios.get(`${REST_API_URL}/${courseId}/students`)