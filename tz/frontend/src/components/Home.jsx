import { useNavigate } from "react-router-dom"

function Home() {
const navigate = useNavigate();

function goToStudents() {
    navigate("/students")
}

function goToCourses() {
    navigate("/courses")
}

  return (
    <div className="text-center">
        <h2>Home</h2>
        <br />
        <ul>
            <li onClick={goToStudents} style={{ cursor: "pointer", color: "blue" }}>
                Students
            </li>
            <li onClick={goToCourses} style={{ cursor: "pointer", color: "blue" }}>
                Courses
            </li>
        </ul>
    </div>
  )
}
export default Home