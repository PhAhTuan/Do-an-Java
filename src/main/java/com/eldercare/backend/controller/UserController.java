package com.eldercare.backend.controller;

import com.eldercare.backend.model.User;
import com.eldercare.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Lấy danh sách người dùng
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Thêm người dùng mới
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
