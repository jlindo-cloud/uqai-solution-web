package com.uqai.backend.dto;

import com.uqai.backend.entity.Usuario;

// Nunca exponemos el hash de la contrasena en las respuestas.
public record UsuarioResponse(Long id, String nombre, String apellidos,
                              String email, String rol, String area) {
    public static UsuarioResponse from(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getNombre(), u.getApellidos(),
                u.getEmail(), u.getRol().name(), u.getArea());
    }
}
