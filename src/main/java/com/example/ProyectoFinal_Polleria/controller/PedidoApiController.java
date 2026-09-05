package com.example.ProyectoFinal_Polleria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ProyectoFinal_Polleria.dto.ItemRequest;
import com.example.ProyectoFinal_Polleria.dto.PedidoRequest;
import com.example.ProyectoFinal_Polleria.entity.DetallePedido;
import com.example.ProyectoFinal_Polleria.entity.Pedido;
import com.example.ProyectoFinal_Polleria.entity.Producto;
import com.example.ProyectoFinal_Polleria.repository.DetallePedidoRepository;
import com.example.ProyectoFinal_Polleria.repository.PedidoRepository;
import com.example.ProyectoFinal_Polleria.repository.ProductoRepository;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoApiController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarPedido(@RequestBody PedidoRequest request) {
        try {
            // 1. Crear e instanciar el Pedido Maestro
            Pedido pedido = new Pedido();
            
            pedido.setNombreCliente(request.getNombreCliente());
            pedido.setTelefonoCliente(request.getTelefonoCliente());
            pedido.setDireccionEntrega(request.getDireccionCliente());
            pedido.setMetodoPago(request.getMetodoPago());
            pedido.setFechaPedido(LocalDateTime.now());
            pedido.setEstado("PENDIENTE");

            // Calcular el subtotal acumulado
            double acumuladoSubtotal = 0.0;
            for (ItemRequest item : request.getItems()) {
                acumuladoSubtotal += item.getPrecioUnitario() * item.getCantidad();
            }
            
            // Asignación de montos obligatorios 
            double costoDelivery = request.getDireccionCliente().equals("Recojo en el local") ? 0.0 : 5.0;
            
            pedido.setSubtotal(acumuladoSubtotal);
            pedido.setDelivery(costoDelivery);
            pedido.setTotal(acumuladoSubtotal + costoDelivery);

            // Guardamos el pedido maestro en MySQL (Genera el ID automáticamente)
            Pedido pedidoGuardado = pedidoRepository.save(pedido);

            // 2. Recorrer y guardar cada Detalle del Pedido vinculado al maestro
            for (ItemRequest item : request.getItems()) {
                DetallePedido detalle = new DetallePedido();
                detalle.setPedido(pedidoGuardado);
                
                Producto producto = productoRepository.findById(item.getProductoId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
                detalle.setProducto(producto);
                
                detalle.setCantidad(item.getCantidad());
                detalle.setPrecioUnitario(item.getPrecioUnitario());

                detallePedidoRepository.save(detalle);
            }

            return ResponseEntity.ok().build(); 

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error interno al procesar la compra");
        }
    }
}