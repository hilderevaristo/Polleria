package com.example.ProyectoFinal_Polleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ProyectoFinal_Polleria.entity.Usuario;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    boolean existsByEmail(String email);
}
