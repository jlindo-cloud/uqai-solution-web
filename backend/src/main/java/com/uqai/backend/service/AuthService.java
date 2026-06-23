package com.uqai.backend.service;

import com.uqai.backend.dto.*;
import com.uqai.backend.entity.*;
import com.uqai.backend.repository.UsuarioRepository;
import com.uqai.backend.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthService(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authManager) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public UsuarioResponse register(RegisterRequest req) {
        if (usuarioRepo.existsByEmail(req.email()))
            throw new RuntimeException("Email ya registrado");

        Usuario u = Usuario.builder()
                .nombre(req.nombre())
                .apellidos(req.apellidos())
                .email(req.email())
                // PROGRAMACION SEGURA: hash bcrypt — nunca guardar texto plano
                .password(passwordEncoder.encode(req.password()))
                .rol(Rol.USER)
                .area(req.area())
                .build();

        return UsuarioResponse.from(usuarioRepo.save(u));
    }

    public AuthResponse login(LoginRequest req) {
        // Spring Security verifica el hash bcrypt automaticamente.
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        String token = jwtService.generateToken(req.email());
        Usuario u = usuarioRepo.findByEmail(req.email()).orElseThrow();
        return new AuthResponse(token, u.getRol().name(), "OK");
    }
}
