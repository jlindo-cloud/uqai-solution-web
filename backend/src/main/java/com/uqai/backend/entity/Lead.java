package com.uqai.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "leads")
public class Lead {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String nombre;
    @Email   private String email;
    private String empresa;
    private String telefono;

    @Column(length = 1000)
    private String mensaje;

    @CreationTimestamp
    private LocalDateTime fechaRegistro; // se asigna automaticamente al guardar

    public Lead() {}

    // ── Getters / Setters ──
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime f) { this.fechaRegistro = f; }

    // ── Builder manual ──
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Lead l = new Lead();
        public Builder nombre(String v)  { l.nombre = v; return this; }
        public Builder email(String v)   { l.email = v; return this; }
        public Builder empresa(String v) { l.empresa = v; return this; }
        public Builder telefono(String v){ l.telefono = v; return this; }
        public Builder mensaje(String v) { l.mensaje = v; return this; }
        public Lead build()              { return l; }
    }
}
