package com.tz.service;

import com.tz.dto.GradeDTO;
import com.tz.entity.Grade;
import com.tz.entity.Student;
import com.tz.repository.GradeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GradeService {
    @Autowired
    private GradeRepo gradeRepository;

    @Autowired
    private StudentService studentService;

    public List<GradeDTO> getGradesByCourse(Long courseId) {
        List<Grade> grades = gradeRepository.findByCourseId(courseId);
        return grades.stream().map(grade -> {
            Student student = studentService.getStudentById(grade.getStudentId());
            return new GradeDTO(
                    grade.getGradeId(),
                    grade.getStudentId(),
                    grade.getCourseId(),
                    student.getFirstName(),
                    student.getLastName(),
                    grade.getGrade(),
                    grade.getComment(),
                    grade.getGradeDate()
            );
        }).collect(Collectors.toList());
    }

    public Optional<Grade> getGrade(Long studentId, Long courseId) {
        return gradeRepository.findByStudentIdAndCourseId(studentId, courseId).stream().findFirst();
    }

    public Grade addGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    public Grade updateGrade(Long id, Grade gradeDetails) {
        return gradeRepository.findById(id).map(grade -> {
            grade.setGrade(gradeDetails.getGrade());
            grade.setComment(gradeDetails.getComment());
            return gradeRepository.save(grade);
        }).orElseThrow(() -> new RuntimeException("Grade not found"));
    }
}
