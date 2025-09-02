package com.ayusutra.Controller;

import com.ayusutra.Entity.Practitioner;
import com.ayusutra.Service.PractitionerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/practitioners")
public class PractitionerController {

    private final PractitionerService practitionerService;

    public PractitionerController(PractitionerService practitionerService) {
        this.practitionerService = practitionerService;
    }

    @GetMapping
    public List<Practitioner> getAllPractitioners() {
        return practitionerService.getAllPractitioners();
    }

    @GetMapping("/{id}")
    public Practitioner getPractitionerById(@PathVariable Long id) {
        return practitionerService.getPractitionerById(id);
    }

    @PostMapping
    public Practitioner createPractitioner(@RequestBody Practitioner practitioner) {
        return practitionerService.savePractitioner(practitioner);
    }

    @DeleteMapping("/{id}")
    public void deletePractitioner(@PathVariable Long id) {
        practitionerService.deletePractitioner(id);
    }
}
