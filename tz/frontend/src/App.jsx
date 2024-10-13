import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import ListOfStudents from './components/ListOfStudents'
import ListOfCourses from './components/ListOfCourses'
import AddStudent from './components/AddStudent'
import AddCourse from './components/AddCourse'
import EditStudent from './components/EditStudent'
import EditCourse from './components/EditCourse'
import CourseManagement from './components/CourseManagement'
import GradesManagement from './components/GradesManagement'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Home/>}></Route>
                <Route path='/students' element = {<ListOfStudents/>}></Route>
                <Route path='/courses' element = {<ListOfCourses/>}></Route>
                <Route path='/addStudent' element = {<AddStudent/>}></Route>
                <Route path='/addCourse' element = {<AddCourse/>}></Route>
                <Route path='/editStudent/:id' element = {<EditStudent/>}></Route>
                <Route path='/editCourse/:id' element = {<EditCourse/>}></Route>
                <Route path='/manageCourse/:courseId' element = {<CourseManagement/>}></Route>
                <Route path="/course/:courseId/grades" element ={<GradesManagement/>}></Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App
