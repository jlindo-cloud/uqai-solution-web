package com.uqai.backend.controller;

import com.uqai.backend.dto.UsuarioResponse;
import com.uqai.backend.entity.Usuario;
import com.uqai.backend.repository.UsuarioRepository;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepo;

    public UsuarioController(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    // GET /api/usuarios — solo ADMIN (lo exige SecurityConfig.hasRole("ADMIN"))
    @GetMapping
    public List<UsuarioResponse> listar() {
        return usuarioRepo.findAll().stream().map(UsuarioResponse::from).toList();
    }

    // GET /api/usuarios/{id} — ADMIN o el mismo USER (control de acceso a nivel de objeto)
    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id, Authentication auth) {
        Usuario u = usuarioRepo.findById(id).orElse(null);
        if (u == null) return ResponseEntity.notFound().build();

        boolean esAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        String emailSolicitante = ((UserDetails) auth.getPrincipal()).getUsername();

        // OWASP A01: evita IDOR — un USER solo puede ver su propio perfil
        if (!esAdmin && !u.getEmail().equals(emailSolicitante)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acceso denegado a este recurso");
        }
        return ResponseEntity.ok(UsuarioResponse.from(u));
    }
}
