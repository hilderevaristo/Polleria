let carrito = [];

let tipoEntregaActual = "Delivery";
let costoDelivery = 5.00;

function agregarAlCarrito(id, nombre, precio, img) {
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id: id, nombre: nombre, precio: parseFloat(precio), img: img, cantidad: 1 });
    }

    actualizarCarrito();
    animarCarritoBoton();
    abrirCarrito();
}

function actualizarCarrito() {
    // ✅ Verificar que el elemento existe
    const lista = document.getElementById('lista-carrito');
    const badge = document.getElementById('carrito-cantidad');
    const footer = document.querySelector('.carrito-footer');

    // Si no existe el carrito en la página, salir
    if (!lista) {
        console.log('⚠️ Carrito no visible en esta página');
        return;
    }

    lista.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<div class="text-center text-muted mt-5">Tu carrito está vacío</div>`;
        if (badge) badge.innerText = '0';
        if (footer) footer.style.display = 'none';
        cerrarCarrito();
    } else {
        if (footer) footer.style.display = 'block';

        carrito.forEach((p, index) => {
            subtotal += p.precio * p.cantidad;
            totalItems += p.cantidad;

            lista.innerHTML += `
                <div class="d-flex align-items-center mb-3 p-2 border rounded">
                    <img src="${p.img}" alt="${p.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0 fw-bold">${p.nombre}</h6>
                        <span class="text-danger fw-bold">S/ ${p.precio.toFixed(2)}</span>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-secondary" onclick="cambiarCant(${index}, -1)">-</button>
                            <span class="btn btn-light disabled px-3">${p.cantidad}</span>
                            <button class="btn btn-outline-secondary" onclick="cambiarCant(${index}, 1)">+</button>
                        </div>
                        <button class="btn btn-link text-danger btn-sm mt-1 p-0" onclick="eliminarDelCarrito(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>`;
        });

        if (badge) badge.innerText = totalItems;
    }

    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.innerText = 'S/ ' + subtotal.toFixed(2);
    if (totalEl) totalEl.innerText = 'S/ ' + (subtotal + 5.00).toFixed(2);
}

function cambiarCant(index, variacion) {
    carrito[index].cantidad += variacion;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); // Si llega a 0, lo borramos
    }
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function abrirCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    if (sidebar) {
        sidebar.classList.add('active');
    }
}

function cerrarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

function animarCarritoBoton() {
    const btn = document.querySelector('.btn-carrito-flotante');
    if (btn) {
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    }
}

// Manejo dinámico del despliegue del input de dirección manual
document.addEventListener("DOMContentLoaded", function () {
    const selectDireccion = document.getElementById('cli-direccion');
    
    if (selectDireccion) {
        selectDireccion.addEventListener('change', function() {
            const manualInput = document.getElementById('cli-direccion-manual');
            if (manualInput) {
                if (this.value === 'OTRA') {
                    manualInput.style.display = 'block';
                    manualInput.required = true;
                    manualInput.focus();
                } else {
                    manualInput.style.display = 'none';
                    manualInput.required = false;
                    manualInput.value = ''; // Limpiamos si regresa a un alias establecido
                }
            }
        });
    }
});



function abrirCheckout() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    document.getElementById('vista-carrito').style.display = 'none';
    document.getElementById('vista-checkout').style.display = 'flex';

    document.getElementById('sidebar-title').innerHTML =
        '<i class="fas fa-receipt"></i> Finalizar Pedido';

    actualizarTotalesCheckout();
}



// NUEVA FUNCIÓN: Actualiza la matemática del checkout
function actualizarTotalesCheckout() {
    let subtotal = 0;
    carrito.forEach(p => subtotal += p.precio * p.cantidad);

    const subtotalEl = document.getElementById('checkout-subtotal');
    const deliveryEl = document.getElementById('checkout-delivery');
    const totalEl = document.getElementById('checkout-total');

    if (subtotalEl && deliveryEl && totalEl) {
        subtotalEl.innerText = 'S/ ' + subtotal.toFixed(2);
        deliveryEl.innerText = 'S/ ' + costoDelivery.toFixed(2);
        totalEl.innerText = 'S/ ' + (subtotal + costoDelivery).toFixed(2);
    }
}

// NUEVA FUNCIÓN: Cambia entre Delivery y Recojo

function seleccionarTipoEntrega(botonClickeado) {
    document.querySelectorAll('button[data-tipo]').forEach(btn => {
        btn.classList.remove('active');
    });

    botonClickeado.classList.add('active');

    tipoEntregaActual = botonClickeado.getAttribute('data-tipo');

    const contenedorDireccion = document.getElementById('contenedor-direccion');
    const contenedorPagos = document.getElementById('contenedor-metodos-pago');

    if (tipoEntregaActual === 'Delivery') {
        costoDelivery = 5.00;

        contenedorDireccion.style.display = 'block';

        contenedorPagos.innerHTML = `
            <button type="button"
                class="btn btn-pago-final active w-50"
                data-metodo="Contraentrega"
                onclick="seleccionarPagoFinal(this)">
                💵 Contraentrega
            </button>

            <button type="button"
                class="btn btn-pago-final w-50"
                data-metodo="Yape"
                onclick="seleccionarPagoFinal(this)">
                📱 Yape
            </button>
        `;
    } else {
        costoDelivery = 0.00;

        contenedorDireccion.style.display = 'none';

        contenedorPagos.innerHTML = `
            <button type="button"
                class="btn btn-pago-final active w-100"
                data-metodo="Pago en caja"
                onclick="seleccionarPagoFinal(this)">
                🏪 Pago en caja (Local)
            </button>
        `;
    }

    actualizarTotalesCheckout();
}


function seleccionarPagoFinal(botonClickeado) {
    document.querySelectorAll('.btn-pago-final').forEach(btn => btn.classList.remove('active'));
    botonClickeado.classList.add('active');
}


function confirmarPedido() {
    const nombre = document.getElementById('cli-nombre').value.trim();
    const telefono = document.getElementById('cli-telefono').value.trim();

    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    if (!nombre || !telefono) {
        alert('Por favor, completa tus datos de contacto.');
        return;
    }

    // Obtener la dirección de entrega
    let direccion = '';

    if (tipoEntregaActual === 'Delivery') {
        const selectDir = document.getElementById('cli-direccion');

        if (!selectDir || !selectDir.value) {
            alert('Selecciona una dirección de entrega.');
            return;
        }

        if (selectDir.value === 'OTRA') {
            const direccionManual =
                document.getElementById('cli-direccion-manual');

            direccion = direccionManual
                ? direccionManual.value.trim()
                : '';

            if (!direccion) {
                alert('Escribe tu dirección de entrega.');
                return;
            }
        } else {
            direccion = selectDir.value.trim();
        }
    } else {
        direccion = 'Recojo en el local';
    }

    // Obtener el método de pago seleccionado
    const botonPagoActivo = document.querySelector('.btn-pago-final.active');

    const metodoPago = botonPagoActivo
        ? botonPagoActivo.getAttribute('data-metodo')
        : 'Contraentrega';

    // Calcular los importes
    const subtotal = carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    const delivery = tipoEntregaActual === 'Delivery'
        ? costoDelivery
        : 0;

    const total = subtotal + delivery;

    // Construir la lista de productos
    const productos = carrito.map(item =>
        `• ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`
    ).join('\n');

    // Crear el mensaje de WhatsApp
    const mensaje = [
        '🍗 *NUEVO PEDIDO RECIBIDO* 🍗 - POLLERÍA DON VÍCTOR*',
        '',
        '*PRODUCTOS:*',
        productos,
        '',
        `Subtotal: S/ ${subtotal.toFixed(2)}`,
        `Delivery: S/ ${delivery.toFixed(2)}`,
        `*TOTAL: S/ ${total.toFixed(2)}*`,
        '',
        '*DATOS DEL CLIENTE:*',
        `Nombre: ${nombre}`,
        `Teléfono: ${telefono}`,
        `Entrega: ${tipoEntregaActual}`,
        `Dirección: ${direccion}`,
        `Método de pago: ${metodoPago}`,
        '',
        'Por favor, confirmar el pedido. ¡Gracias!'
    ].join('\n');

    // Número de WhatsApp del negocio: Perú +51
    const numeroWhatsApp = '51935058266';

    const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Preparar los datos que se guardarán en el sistema
    const pedidoData = {
        nombreCliente: nombre,
        telefonoCliente: telefono,
        direccionCliente: direccion,
        metodoPago: metodoPago,
        tipoEntrega: tipoEntregaActual,
        items: carrito.map(item => ({
            productoId: parseInt(item.id, 10),
            cantidad: item.cantidad,
            precioUnitario: item.precio
        }))
    };

    // Abrir una ventana vacía para evitar que el navegador bloquee WhatsApp
    const ventanaWhatsApp = window.open('about:blank', '_blank');

    // Guardar el pedido antes de abrir WhatsApp
    fetch('/procesarPedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
    })
        .then(async response => {
            const resultado = await response.json();

            if (!response.ok || resultado.success !== true) {
                throw new Error(
                    resultado.message || 'No se pudo guardar el pedido.'
                );
            }

            // Redirigir la ventana a WhatsApp
            if (ventanaWhatsApp && !ventanaWhatsApp.closed) {
                ventanaWhatsApp.location.href = urlWhatsApp;
            } else {
                window.location.href = urlWhatsApp;
            }

            // Limpiar el carrito y mostrar la confirmación
            carrito = [];
            actualizarCarrito();

            document.getElementById('vista-checkout').style.display = 'none';
            document.getElementById('vista-exito').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error al confirmar el pedido:', error);

            if (ventanaWhatsApp && !ventanaWhatsApp.closed) {
                ventanaWhatsApp.close();
            }

            alert(error.message || 'Error al procesar el pedido.');
        });
}


function volverAlCarrito() {
    document.getElementById('vista-checkout').style.display = 'none';
    document.getElementById('vista-carrito').style.display = 'flex';
    document.getElementById('sidebar-title').innerHTML = '<i class="fas fa-shopping-cart"></i> Tu Carrito';
}

function cerrarVistaExito() {
    cerrarCarrito(); 
    document.getElementById('vista-exito').style.display = 'none';
    document.getElementById('vista-carrito').style.display = 'flex';
}
