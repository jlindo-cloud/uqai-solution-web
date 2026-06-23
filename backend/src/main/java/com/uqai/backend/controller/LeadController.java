package com.uqai.backend.controller;

import com.uqai.backend.dto.LeadRequest;
import com.uqai.backend.entity.Lead;
import com.uqai.backend.repository.LeadRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadRepository leadRepo;

    public LeadController(LeadRepository leadRepo) {
        this.leadRepo = leadRepo;
    }

    // POST /api/leads — publico (formulario de contacto). Inputs validados con @Valid.
    @PostMapping
    public ResponseEntity<Lead> crear(@Valid @RequestBody LeadRequest req) {
        Lead lead = Lead.builder()
                .nombre(req.nombre())
                .email(req.email())
                .empresa(req.empresa())
                .telefono(req.telefono())
                .mensaje(req.mensaje())
                .build();
        return ResponseEntity.ok(leadRepo.save(lead));
    }

    // GET /api/leads — solo ADMIN (lo exige SecurityConfig.hasRole("ADMIN"))
    @GetMapping
    public List<Lead> listar() {
        return leadRepo.findAll();
    }
}
