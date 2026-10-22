package com.example.ProyectoFinal_Polleria.controller;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.ProyectoFinal_Polleria.entity.Producto;
import com.example.ProyectoFinal_Polleria.repository.ProductoRepository;

@RestController
@RequestMapping("/api/productos")
public class DonVictorRestController {

    private final ProductoRepository productoRepository;

    public DonVictorRestController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // GET /api/productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // GET /api/productos/1
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    // POST /api/productos
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT /api/productos/1
    @PutMapping("/{id}")
    public Producto actualizarProducto(
            @PathVariable Long id,
            @RequestBody Producto datos) {

        Producto producto = productoRepository.findById(id).orElse(null);

        if (producto == null) {
            return null;
        }

        producto.setNombre(datos.getNombre());
        producto.setDescripcion(datos.getDescripcion());
        producto.setPrecio(datos.getPrecio());
        producto.setCategoria(datos.getCategoria());
        producto.setImagenUrl(datos.getImagenUrl());

        return productoRepository.save(producto);
    }

    // DELETE /api/productos/1
    @DeleteMapping("/{id}")
    public String eliminarProducto(@PathVariable Long id) {

        productoRepository.deleteById(id);

        return "Producto eliminado correctamente";
    }
}