package com.uqai.backend.dto;

import jakarta.validation.constraints.*;

// Validacion de inputs (OWASP): @NotBlank, @Email, @Size aplicados en el borde de la API.
public record RegisterRequest(
        @NotBlank String nombre,
        @NotBlank String apellidos,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 8, message = "La contrasena debe tener al menos 8 caracteres") String password,
        @NotBlank String area
) {}
