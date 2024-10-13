import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addCourse } from "../services/CourseService"


const AddCourse = () => {

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [teacher, setTeacher] = useState("")

const navigator = useNavigate();

function saveCourse(e) {
    e.preventDefault();

    const course = {title, description, teacher}
    console.log("Added new course");
    console.log(course);

    addCourse(course).then(response => {
        console.log(response.data);
        navigator("/courses")
    })
}

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <h2 className="text-center mb-4">Add Course</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label">Title:</label>
                                <input
                                    type='text'
                                    placeholder="Enter course title"
                                    name="title"
                                    value={title}
                                    className="form-control"
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    placeholder="Enter course description"
                                    name="description"
                                    value={description}
                                    className="form-control"
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Teacher:</label>
                                <input
                                    type='text'
                                    placeholder="Enter teacher name"
                                    name="teacher"
                                    value={teacher}
                                    className="form-control"
                                    onChange={e => setTeacher(e.target.value)}
                                />
                            </div>
                            <div className="d-grid mt-4">
                                <button type="button" className="btn btn-primary" onClick={saveCourse}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCourse