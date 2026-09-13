# README del proyecto

# comando para ver mis commit y si estan puesto su tag
git log --oneline
git push origin v1.0.0
## 1. Descripción del proyecto

**Polleria** es una aplicación web para la pollería **Don Víctor**. El sistema permite mostrar un catálogo de productos, gestionar usuarios y direcciones, armar un carrito y registrar pedidos con delivery o recojo en el local. También incluye un panel administrativo para consultar y administrar productos, usuarios y pedidos.

El proyecto busca centralizar la exhibición del menú y el proceso de compra en línea, almacenando la información en una base de datos MySQL.

## 2. ¿Qué hace el proyecto?

Actualmente el sistema permite:

- Mostrar una página de inicio con menú, información del negocio, testimonios y sección de contacto.
- Mostrar productos agrupados por categorías como promociones, pollos, piqueos, hamburguesas, wraps, acompañamientos, postres y bebidas.
- Filtrar productos por categoría desde el frontend.
- Registrar usuarios y validar el acceso mediante correo y contraseña.
- Mantener la sesión del usuario y cerrar sesión.
- Administrar los datos personales, contraseña y direcciones guardadas del usuario.
- Agregar productos al carrito y confirmar pedidos.
- Calcular subtotal, costo de delivery y total del pedido.
- Registrar pedidos y sus detalles en MySQL.
- Permitir a un administrador consultar estadísticas, usuarios, productos y pedidos.
- Crear, consultar, actualizar y eliminar productos desde las operaciones disponibles del panel administrativo.
- Cambiar el estado de los pedidos y eliminarlos desde el panel administrativo.
- Recibir mensajes enviados desde el formulario de contacto.

## 3. ¿Por qué el proyecto es útil?

El sistema está pensado para clientes de la pollería que necesitan consultar el menú y realizar pedidos sin gestionar el proceso manualmente. También está pensado para el personal administrador, que puede consultar el catálogo, los usuarios y los pedidos registrados.

Sus beneficios principales son:

- Presentar el catálogo y sus precios en un solo lugar.
- Facilitar la selección de productos mediante un carrito.
- Registrar los datos de entrega y el método de pago indicado por el cliente.
- Guardar direcciones frecuentes para futuros pedidos.
- Proporcionar una vista administrativa para revisar la operación del negocio.

## 4. Tecnologías utilizadas

- **Java 17**.
- **Spring Boot 3.2.0**.
- **Spring MVC / Spring Web** para controladores web y respuestas JSON.
- **Spring Data JPA** para la persistencia de entidades.
- **Hibernate**, incluido mediante Spring Data JPA.
- **Thymeleaf** para las vistas HTML del servidor.
- **MySQL Connector/J** para la conexión con MySQL.
- **Maven** y Maven Wrapper (`mvnw` / `mvnw.cmd`) para la construcción y ejecución.
- **JUnit 5 y Spring Boot Test** para la prueba automatizada existente.
- **JavaScript, HTML y CSS** para la interfaz.
- **Bootstrap 5.3.2** cargado desde CDN en las vistas que lo utilizan.
- **SweetAlert2** cargado desde CDN en la vista de perfil.
- **Docker** mediante el archivo `dockerfile`, con una imagen de compilación Maven y una imagen de ejecución Eclipse Temurin 17 JRE Alpine.
- **Git/GitHub**. El repositorio configurado es [hilderevaristo/Polleria](https://github.com/hilderevaristo/Polleria).

El proyecto no declara una dependencia ni una integración SDK de Cloudinary. Los productos sí pueden almacenar una URL de imagen externa en el campo `imagenUrl`.

## 5. Requisitos

- Java Development Kit (JDK) 17.
- MySQL accesible desde la aplicación.
- Maven instalado, o usar el Maven Wrapper incluido.
- Navegador web moderno.
- Git para clonar el repositorio.
- Opcionalmente, Docker para construir la imagen definida en `dockerfile`.

La configuración actual espera una base de datos llamada `bd_integrador` en `localhost:3306`. El usuario, la contraseña y la URL pueden modificarse en `src/main/resources/application.properties`.

## 6. Instalación y configuración

### Clonar el proyecto

```bash
git clone https://github.com/hilderevaristo/Polleria.git
cd Polleria
```

### Crear la base de datos

Crear en MySQL una base de datos vacía con el nombre esperado:

```sql
CREATE DATABASE bd_integrador;
```

El archivo `src/main/resources/script_catalogo_donvictor.sql` contiene inserciones para productos y un usuario de ejemplo. No crea la base de datos ni contiene definiciones `CREATE TABLE`; las tablas son gestionadas por Hibernate porque la configuración usa `spring.jpa.hibernate.ddl-auto=update`.

### Configurar la conexión

Editar `src/main/resources/application.properties` y colocar valores locales, sin publicar contraseñas reales:

```properties
spring.application.name=ProyectoFianal_Integrador
spring.datasource.url=jdbc:mysql://localhost:3306/bd_integrador
spring.datasource.username=TU_USUARIO_MYSQL
spring.datasource.password=TU_CONTRASENA_MYSQL
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

La configuración del repositorio contiene actualmente una contraseña escrita directamente en `application.properties`. Debe reemplazarse por un valor local y no debe compartirse ni subirse a un repositorio público.

### Cargar datos iniciales

Después de crear la base de datos y configurar la conexión, ejecutar el contenido de `src/main/resources/script_catalogo_donvictor.sql` en `bd_integrador` si se desean los productos y el usuario de ejemplo. Las credenciales del usuario de ejemplo no se documentan aquí por seguridad; deben revisarse o cambiarse localmente antes de usar el sistema.

### Ejecutar la aplicación

En Windows:

```powershell
./mvnw.cmd spring-boot:run
```

En Linux o macOS:

```bash
./mvnw spring-boot:run
```

También se puede compilar y ejecutar el JAR:

```bash
./mvnw clean package
java -jar target/ProyectoFianal_Integrador-0.0.1-SNAPSHOT.jar
```

La aplicación queda disponible en `http://localhost:8080`.

### Ejecutar con Docker

El `dockerfile` construye el proyecto con Maven y Java 17, y expone el puerto 8080:

```bash
docker build -f dockerfile -t polleria .
docker run --rm -p 8080:8080 polleria
```

La aplicación todavía necesita conectarse a un servidor MySQL accesible desde el contenedor. La URL de la base de datos debe ajustarse según la red utilizada por Docker.

## 7. Cómo comenzar a usar el proyecto

1. Iniciar MySQL y preparar `bd_integrador`.
2. Configurar las credenciales en `application.properties`.
3. Cargar el catálogo inicial si corresponde.
4. Ejecutar la aplicación y abrir `http://localhost:8080`.
5. Desde el inicio, revisar el menú, filtrar productos y abrir el carrito.
6. Registrarse en `/registro` o iniciar sesión en `/login`.
7. Para un usuario autenticado, gestionar el perfil en `/perfil` y confirmar pedidos desde el carrito.
8. Un usuario con rol `ADMIN` puede acceder a `/admin/dashboard`, `/admin/usuarios`, `/admin/productos` y `/admin/pedidos`.

## 8. Funcionalidades principales

### Usuarios normales

- Registro con nombre, correo, teléfono y contraseña.
- Inicio de sesión y cierre de sesión mediante sesión HTTP.
- Consulta del catálogo y filtrado por categoría.
- Carrito de compra en el frontend.
- Registro de pedidos con datos del cliente, entrega, método de pago e ítems.
- Cálculo de subtotal, delivery y total.
- Edición del nombre y teléfono desde el perfil.
- Cambio de contraseña.
- Alta, eliminación y selección de dirección predeterminada.
- Envío de mensajes de contacto.

### Administradores

- Dashboard con cantidades de productos, usuarios, pedidos e ingresos.
- Consulta y eliminación de usuarios, sin permitir eliminar al administrador de la sesión.
- Consulta, creación, edición y eliminación de productos mediante las operaciones implementadas.
- Consulta de pedidos, conteo por estados e ingresos.
- Cambio de estado de pedidos entre `pendiente`, `procesando`, `enviado`, `completado` y `cancelado`.
- Eliminación de pedidos.

El control de acceso administrativo se realiza comprobando en la sesión que el rol sea `ADMIN`. No hay una configuración activa de Spring Security en el código actual; `SecurityConfig` contiene únicamente código comentado.

## 9. Estructura del proyecto

```text
Polleria/
├── pom.xml                         # Dependencias y configuración Maven
├── mvnw, mvnw.cmd                  # Maven Wrapper
├── dockerfile                       # Construcción y ejecución con Docker
├── src/main/java/com/example/
│   └── ProyectoFinal_Polleria/
│       ├── config/                  # Configuración de la aplicación
│       ├── controller/              # Controladores web y API de pedidos
│       ├── dto/                    # Objetos de entrada para pedidos
│       ├── entity/                 # Entidades JPA del dominio
│       └── repository/             # Repositorios Spring Data JPA
├── src/main/resources/
│   ├── application.properties      # Configuración de aplicación y MySQL
│   ├── script_catalogo_donvictor.sql# Datos iniciales del catálogo y usuario
│   ├── static/                     # CSS, JavaScript e imágenes
│   └── templates/                  # Vistas Thymeleaf y fragmentos HTML
└── src/test/java/                  # Pruebas automatizadas
```

Las entidades principales son `Usuario`, `Direccion`, `Producto`, `Pedido`, `DetallePedido` y `Contacto`. `ItemCarrito` representa un elemento del carrito en memoria.

## 10. API / Endpoints

El proyecto tiene una API REST para guardar pedidos:

### `POST /api/pedidos/guardar`

Guarda un pedido y sus detalles. Recibe JSON con los datos del cliente, entrega, método de pago y productos. El costo de delivery es `0.0` cuando `direccionCliente` es `Recojo en el local`; en los demás casos se calcula como `5.0`.

Ejemplo de solicitud:

```http
POST http://localhost:8080/api/pedidos/guardar
Content-Type: application/json
```

```json
{
  "nombreCliente": "Cliente de prueba",
  "telefonoCliente": "999999999",
  "direccionCliente": "Av. Principal 123",
  "metodoPago": "Efectivo",
  "items": [
    {
      "productoId": 1,
      "cantidad": 2,
      "precioUnitario": 25.0
    }
  ]
}
```

Respuesta exitosa: `200 OK` sin cuerpo. Si ocurre un error durante el procesamiento, responde `500` con el texto `Error interno al procesar la compra`.

También existen endpoints JSON usados por la interfaz web, entre ellos:

| Método | URL | Uso |
|---|---|---|
| `POST` | `/procesarLogin` | Valida correo y contraseña y devuelve `success`, nombre, rol o un código de error. |
| `POST` | `/procesarPedido` | Registra un pedido desde el carrito web y devuelve `success` y `message`. |
| `GET` | `/admin/productos/obtener/{id}` | Devuelve los datos de un producto para edición. |
| `POST` | `/admin/productos/guardar` | Crea un producto y devuelve `success` y `message`. |
| `POST` | `/admin/productos/eliminar/{id}` | Elimina un producto y devuelve `success` y `message`. |
| `POST` | `/admin/pedido-cambiar-estado` | Cambia el estado de un pedido mediante `id` y `estado`. |
| `POST` | `/admin/pedido-eliminar` | Elimina un pedido mediante `id`. |

Las demás rutas web devuelven vistas Thymeleaf o redirecciones, por lo que no constituyen una API REST independiente.

## 11. Pruebas

Existe una prueba automatizada en `src/test/java/com/example/ProyectoFianal_Integrador/ProyectoFianalIntegradorApplicationTests.java`.

La prueba intenta ejecutar `contextLoads()` con `@SpringBootTest`, pero actualmente falla porque su paquete (`com.example.ProyectoFianal_Integrador`) no coincide con el paquete de la clase `@SpringBootApplication` (`com.example.ProyectoFinal_Polleria`). No hay pruebas automatizadas específicas para login, carrito, pedidos, perfil o administración en el código actual.

Ejecutar las pruebas con Maven:

```bash
./mvnw test
```

En Windows:

```powershell
./mvnw.cmd test
```

La prueba de contexto requiere que la configuración de la aplicación pueda resolver la conexión y el contexto de persistencia de MySQL.

## 12. Ayuda y soporte

### ¿Dónde recibir ayuda?

Los problemas, errores y dudas pueden reportarse en la sección de [Issues del repositorio de GitHub](https://github.com/hilderevaristo/Polleria/issues). También se puede revisar el código fuente y abrir una discusión o Pull Request en [github.com/hilderevaristo/Polleria](https://github.com/hilderevaristo/Polleria).

## 13. Contribución

1. Crear un fork del repositorio.
2. Crear una rama para el cambio:

   ```bash
   git checkout -b mi-cambio
   ```

3. Realizar y probar los cambios.
4. Crear un commit:

   ```bash
   git add .
   git commit -m "Describe el cambio"
   ```

5. Hacer push de la rama:

   ```bash
   git push origin mi-cambio
   ```

6. Crear un Pull Request hacia el repositorio original.

## 14. Mantenedores y colaboradores

- **Mantenedor identificado en Git:** Hilder Evaristo (`hilderevaristo`).
- **Colaboradores adicionales:** Por definir. No se identificaron otros autores en el historial local consultado.

## 15. Licencia

Actualmente no se ha especificado una licencia. El `pom.xml` contiene una sección de licencia vacía y no se encontró un archivo de licencia en la raíz del proyecto.

## 16. Estado del proyecto

**En desarrollo.** El proyecto tiene un flujo web implementado, pero la prueba automatizada de contexto falla actualmente por la discrepancia de paquetes indicada en la sección de pruebas. Además, la cobertura automatizada es mínima, la configuración de credenciales está escrita en propiedades locales y el código referencia las vistas `admin/productos-editar` y `admin/productos-nuevo`, que no están presentes en la estructura actual revisada. Por ello, debe validarse el flujo administrativo completo antes de considerarlo terminado.