package com.ayusutra.Service;

import com.ayusutra.Entity.Practitioner;
import com.ayusutra.Repository.PractitionerRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PractitionerService {

    private final PractitionerRepository practitionerRepository;

    public PractitionerService(PractitionerRepository practitionerRepository) {
        this.practitionerRepository = practitionerRepository;
    }

    public List<Practitioner> getAllPractitioners() {
        return practitionerRepository.findAll();
    }

    public Practitioner getPractitionerById(Long id) {
        return practitionerRepository.findById(id).orElse(null);
    }

    public Practitioner savePractitioner(Practitioner practitioner) {
        return practitionerRepository.save(practitioner);
    }

    public void deletePractitioner(Long id) {
        practitionerRepository.deleteById(id);
    }
}
