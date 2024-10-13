package com.tz.service;

import com.tz.dto.StudentCourseDTO;
import com.tz.entity.Course;
import com.tz.entity.Student;
import com.tz.repository.CourseRepo;
import com.tz.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

    public List<StudentCourseDTO> findByCourseId(Long courseId) {
        List<Student> students = studentRepo.findByCourseId(courseId);
        return students.stream().map(student -> {
            return new StudentCourseDTO(
                    student.getId(),
                    student.getFirstName(),
                    student.getLastName(),
                    student.getEmail(),
                    student.getBirthDate(),
                    student.getCourse() != null ? student.getCourse().getId() : null
            );
        }).collect(Collectors.toList());
    }

    // Получаем студента по его ID
    public Student getStudentById(Long id) {
        return studentRepo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public List<Student> getUnassignedStudents() {
        return studentRepo.findAll().stream()
                .filter(student -> student.getCourse() == null)
                .collect(Collectors.toList());
    }

    // Сохраняем студента
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student editStudent(@RequestBody Student updatedStudent) {
        Student existingStudent = studentRepo.findById(updatedStudent.getId()).orElseThrow(() -> new RuntimeException("Student not found"));

        existingStudent.setFirstName(updatedStudent.getFirstName());
        existingStudent.setLastName(updatedStudent.getLastName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setBirthDate(updatedStudent.getBirthDate());
        // Don't change the course assignment
        // existingStudent.setCourse(updatedStudent.getCourse());

        return studentRepo.save(existingStudent);
    }

    // Привязываем студента к курсу
    public Student assignCourseToStudent(Long studentId, Long courseId) {
        Student student = getStudentById(studentId);
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
        if (student.getCourse() != null) {
            throw new IllegalArgumentException("Student is already assigned to a course");
        }
        student.setCourse(course);
        return studentRepo.save(student);
    }

    // Отвязываем студента от курса
    public Student unassignCourseFromStudent(Long studentId, Long courseId) {
        Student student = getStudentById(studentId);
        if (student.getCourse() == null || !(student.getCourse().getId().equals(courseId))) {
            throw new IllegalArgumentException("Student is not assigned to this course");
        }
        student.setCourse(null);
        return studentRepo.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepo.delete(student);
    }
}

