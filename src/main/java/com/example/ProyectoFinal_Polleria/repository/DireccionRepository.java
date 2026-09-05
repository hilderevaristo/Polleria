package com.example.ProyectoFinal_Polleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ProyectoFinal_Polleria.entity.Direccion;

import java.util.List;

@Repository 
public interface DireccionRepository extends JpaRepository<Direccion, Long> {
    
    // Método personalizado para buscar todas las direcciones de un usuario específico
    List<Direccion> findByUsuarioId(Long usuarioId);
}