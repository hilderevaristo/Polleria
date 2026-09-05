package com.example.ProyectoFinal_Polleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ProyectoFinal_Polleria.entity.Contacto;



public interface ContactoRepository extends JpaRepository<Contacto, Long> {
}