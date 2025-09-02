package com.ayusutra.Service;

import com.ayusutra.Entity.Therapy;
import com.ayusutra.Repository.TherapyRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TherapyService {

    private final TherapyRepository therapyRepository;

    public TherapyService(TherapyRepository therapyRepository) {
        this.therapyRepository = therapyRepository;
    }

    public List<Therapy> getAllTherapies() {
        return therapyRepository.findAll();
    }

    public Therapy getTherapyById(Long id) {
        return therapyRepository.findById(id).orElse(null);
    }

    public Therapy saveTherapy(Therapy therapy) {
        return therapyRepository.save(therapy);
    }

    public void deleteTherapy(Long id) {
        therapyRepository.deleteById(id);
    }
}
