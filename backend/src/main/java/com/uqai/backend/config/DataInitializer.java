package com.uqai.backend.config;

import com.uqai.backend.entity.*;
import com.uqai.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Crea usuarios de prueba al arrancar (ADMIN y USER) con contrasenas hasheadas en bcrypt.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepo.count() == 0) {
            usuarioRepo.save(Usuario.builder()
                    .nombre("Ana").apellidos("Admin")
                    .email("admin@uqai.pe")
                    .password(passwordEncoder.encode("Admin2026!"))
                    .rol(Rol.ADMIN).area("Sistemas").build());

            usuarioRepo.save(Usuario.builder()
                    .nombre("Maria").apellidos("User")
                    .email("user@uqai.pe")
                    .password(passwordEncoder.encode("User2026!"))
                    .rol(Rol.USER).area("Marketing").build());

            System.out.println(">> Usuarios de prueba creados: admin@uqai.pe / user@uqai.pe");
        }
    }
}
