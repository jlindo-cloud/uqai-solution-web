package com.uqai.backend.security;

import com.uqai.backend.entity.Usuario;
import com.uqai.backend.repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepo;

    public CustomUserDetailsService(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario u = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        // El authority "ROLE_<rol>" es lo que verifica hasRole("ADMIN")
        return User.builder()
                .username(u.getEmail())
                .password(u.getPassword())   // hash bcrypt almacenado
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + u.getRol().name())))
                .build();
    }
}
