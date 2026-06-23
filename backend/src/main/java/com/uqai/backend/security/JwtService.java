package com.uqai.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * PROGRAMACION SEGURA: el JWT se firma con HMAC-SHA256 usando una clave secreta
 * larga (>=256 bits). El cliente NO puede modificar el payload sin invalidar la firma.
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // Generar token JWT firmado con HS256
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    // Extraer el email (subject) del token
    public String extractEmail(String token) {
        return Jwts.parser().verifyWith(getSigningKey())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();
    }

    // Validar token: firma correcta + no expirado + email coincide
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            return extractEmail(token).equals(userDetails.getUsername())
                    && !isTokenExpired(token);
        } catch (JwtException e) {
            return false; // token malformado, expirado o firma invalida
        }
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser().verifyWith(getSigningKey())
                .build().parseSignedClaims(token)
                .getPayload().getExpiration().before(new Date());
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
}
