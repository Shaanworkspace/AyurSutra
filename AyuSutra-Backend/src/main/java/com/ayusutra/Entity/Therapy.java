package com.ayusutra.Entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "therapies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Therapy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private String description;

    private int duration; // in minutes

    @Lob
    private String precautionsPre;

    @Lob
    private String precautionsPost;
}
