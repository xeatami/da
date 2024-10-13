package com.tz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeDTO {
    private Long gradeId;
    private Long id;
    private Long courseId;
    private String studentFirstName;
    private String studentLastName;
    private Double grade;
    private String comment;
    private Date gradeDate;
}
