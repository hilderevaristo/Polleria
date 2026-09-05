package com.example.ProyectoFinal_Polleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ProyectoFinal_Polleria.entity.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}