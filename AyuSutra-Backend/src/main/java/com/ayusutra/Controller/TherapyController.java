package com.ayusutra.Controller;

import com.ayusutra.Entity.Therapy;
import com.ayusutra.Service.TherapyService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/therapies")
public class TherapyController {

    private final TherapyService therapyService;

    public TherapyController(TherapyService therapyService) {
        this.therapyService = therapyService;
    }

    @GetMapping
    public List<Therapy> getAllTherapies() {
        return therapyService.getAllTherapies();
    }

    @GetMapping("/{id}")
    public Therapy getTherapyById(@PathVariable Long id) {
        return therapyService.getTherapyById(id);
    }

    @PostMapping
    public Therapy createTherapy(@RequestBody Therapy therapy) {
        return therapyService.saveTherapy(therapy);
    }

    @DeleteMapping("/{id}")
    public void deleteTherapy(@PathVariable Long id) {
        therapyService.deleteTherapy(id);
    }
}
