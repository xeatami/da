package com.tz.repository;

import com.tz.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepo extends JpaRepository<Grade, Long> {
    List<Grade> findByCourseId(Long courseId);
    List<Grade> findByStudentIdAndCourseId(Long studentId, Long courseId);
}


