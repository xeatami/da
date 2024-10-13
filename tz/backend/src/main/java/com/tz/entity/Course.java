package com.tz.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String title;
    @Column
    private String description;
    @Column(nullable = false)
    private String teacher;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Student> students;
}
