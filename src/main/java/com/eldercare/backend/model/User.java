package com.eldercare.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // 👈 Thêm dòng này để đổi tên bảng
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
}
