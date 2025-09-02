package com.ayusutra.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "practitioners")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Practitioner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private String specialization;

    private int experienceYears;

    private String availability; // store as JSON or simple text (e.g., "Mon-Fri 9-5")
}

