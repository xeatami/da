package com.tz.controller;

import com.tz.dto.StudentCourseDTO;
import com.tz.entity.Student;
import com.tz.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("admin/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Получить всех студентов, привязанных к конкретному курсу
    @GetMapping("/course/{courseId}")
    public List<StudentCourseDTO> getStudentsByCourse(@PathVariable Long courseId) {
        return studentService.findByCourseId(courseId);
    }


    // Получить студента по его ID
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/unassigned")
    public List<Student> getUnassignedStudents() {
        return studentService.getUnassignedStudents();
    }

    // Добавить нового студента
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // Редактировать данные студента
    @PutMapping("/editStudent")
    public Student editStudent(@RequestBody Student student) {
        return studentService.editStudent(student);
    }

    // Привязать студента к курсу
    @PutMapping("/{studentId}/assignCourse/{courseId}")
    public Student assignCourseToStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        return studentService.assignCourseToStudent(studentId, courseId);
    }

    // Отвязать студента от курса
    @PutMapping("/{studentId}/unassignCourse/{courseId}")
    public Student unassignCourseFromStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        return studentService.unassignCourseFromStudent(studentId, courseId);
    }

    // Удалить студента
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
