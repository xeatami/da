package com.tz.repository;

import com.tz.entity.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username);
    MyUser findByEmail(String email);
}
