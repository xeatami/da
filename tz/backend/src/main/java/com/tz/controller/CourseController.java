package com.tz.controller;


import com.tz.entity.Course;
import com.tz.entity.Student;
import com.tz.repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepo courseRepo;

    // Получить все курсы
    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    // Получить курс по ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseRepo.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @GetMapping("/{courseId}/students")
    public List<Student> getStudentsByCourseId(@PathVariable long courseId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return course.getStudents();
    }

    // Добавить новый курс
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseRepo.save(course);
    }

    // Обновить курс
    @PutMapping("/editCourse")
    public Course editCourse(@RequestBody Course course) {
        return courseRepo.findById(course.getId())
                .map(existingCourse -> {
                    existingCourse.setTitle(course.getTitle());
                    existingCourse.setDescription(course.getDescription());
                    existingCourse.setTeacher(course.getTeacher());
                    return courseRepo.save(existingCourse);
                })
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    // Удалить курс по ID
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        if (!courseRepo.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        courseRepo.deleteById(id);
    }
}
