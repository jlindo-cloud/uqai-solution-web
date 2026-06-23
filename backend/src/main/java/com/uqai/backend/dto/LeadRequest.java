package com.uqai.backend.dto;

import jakarta.validation.constraints.*;

public record LeadRequest(
        @NotBlank String nombre,
        @Email @NotBlank String email,
        String empresa,
        String telefono,
        @Size(max = 1000) String mensaje
) {}
