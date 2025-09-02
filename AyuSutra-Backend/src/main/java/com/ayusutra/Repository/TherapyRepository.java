package com.ayusutra.Repository;

import com.ayusutra.Entity.Therapy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TherapyRepository extends JpaRepository<Therapy, Long> {
}
