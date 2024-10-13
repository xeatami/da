package com.tz.controller;

import com.tz.dto.GradeDTO;
import com.tz.entity.Grade;
import com.tz.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/grades")
public class GradeController {
    @Autowired
    private GradeService gradeService;

    @GetMapping("/course/{courseId}")
    public List<GradeDTO> getGradesByCourse(@PathVariable Long courseId) {
        return gradeService.getGradesByCourse(courseId);
    }

    @GetMapping("/student/{studentId}/course/{courseId}")
    public Optional<Grade> getGradeByStudentAndCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        return gradeService.getGrade(studentId, courseId);
    }

    @PostMapping("/add")
    public ResponseEntity<Grade> addGrade(@RequestBody Grade grade) {
        Grade savedGrade = gradeService.addGrade(grade);
        return new ResponseEntity<>(savedGrade, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public Grade updateGrade(@PathVariable Long id, @RequestBody Grade gradeDetails) {
        return gradeService.updateGrade(id, gradeDetails);
    }
}
