'use strict'
// ================================
// Variables globales
// ================================
let ventas = [];
let productos = [];
let clientes = [];
let ventaEnEdicion = null;
let productoEnEdicion = null;
let clienteEnEdicion = null;


// ================================
// Mostrar Secciones Dinámicamente
// ================================

function mostrarSeccionInicio(titulo, contenido) {
    window.location.replace('principal.aspx');
}

function mostrarSeccion(seccion) {
    const titulo = document.getElementById("titulo-seccion");
    const contenido = document.getElementById("contenido");

    if (seccion === "inicio") {
        mostrarSeccionInicio(titulo, contenido);
    } else if (seccion === "ventas") {
        mostrarSeccionVentas(titulo, contenido);
    } else if (seccion === "producto") {
        mostrarSeccionProductos(titulo, contenido);
    } else if (seccion === "cliente") {
        mostrarSeccionClientes(titulo, contenido);
    } else if (seccion === "reporte") {
        mostrarSeccionReportes(titulo, contenido);
    } else if (seccion === "inventario") {
        mostrarSeccionInventario(titulo, contenido);
    } else if (seccion === "declaracion") {
        mostrarSeccionDeclaraciones(titulo, contenido);
    } else {
        titulo.textContent = "Bienvenido";
        contenido.innerHTML = "<p>Selecciona una opción en el menú para navegar.</p>";
    }
}

// ================================
// Funciones de Ventas
// ================================

function mostrarSeccionVentas(titulo, contenido) {
    titulo.textContent = "ventas";
    contenido.innerHTML = `
        <button class="btn" onclick="abrirModalVenta()">Registrar Venta</button>
        <h3>Lista de Ventas</h3>
        <table id="tablaVentas">
            <thead>
                <tr>
                    <th>Número Venta</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${ventas
            .map(
                (venta, index) => `
                        <tr>
                            <td>${venta.numero}</td>
                            <td>${venta.cliente}</td>
                            <td>${venta.fecha}</td>
                            <td>${venta.total}</td>
                            <td>
                                <button class="btn" onclick="editarVenta(${index})">Editar</button>
                                <button class="btn cancelar" onclick="eliminarVenta(${index})">Eliminar</button>
                            </td>
                        </tr>
                    `
            )
            .join("")}
            </tbody>
        </table>
    `;
}

function abrirModalVenta() {
    ventaEnEdicion = null;
    document.getElementById("ventaForm").reset();
    document.getElementById("detalleVentaModal").style.display = "flex";
}

function cerrarModalVenta() {
    document.getElementById("detalleVentaModal").style.display = "none";
}

function guardarVenta() {
    const venta = {
        numero: document.getElementById("numeroVenta").value,
        cliente: document.getElementById("nombreCliente").value,
        fecha: document.getElementById("fechaRegistro").value,
        total: document.getElementById("total").value
    };

    if (ventaEnEdicion === null) {
        ventas.push(venta);
    } else {
        ventas[ventaEnEdicion] = venta;
    }

    cerrarModalVenta();
    mostrarSeccion("ventas");
}

function editarVenta(index) {
    ventaEnEdicion = index;
    const venta = ventas[index];

    document.getElementById("numeroVenta").value = venta.numero;
    document.getElementById("nombreCliente").value = venta.cliente;
    document.getElementById("fechaRegistro").value = venta.fecha;
    document.getElementById("total").value = venta.total;

    abrirModalVenta();
}

function eliminarVenta(index) {
    ventas.splice(index, 1);
    mostrarSeccion("ventas");
}

// ================================
// Funciones de Productos
// ================================

function mostrarSeccionProductos(titulo, contenido) {
    titulo.textContent = "Productos";
    contenido.innerHTML = `
        <button class="btn" onclick="abrirModalProducto()">Registrar Producto</button>
        <h3>Lista de Productos</h3>
        <table id="tablaProductos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoria</th>
                    <th>Origen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos
            .map(
                (producto, index) => `
                        <tr>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.categoria}</td>
                            <td>${producto.origen}</td>
                            <td>
                                <button class="btn" onclick="editarProducto(${index})">Editar</button>
                                <button class="btn cancelar" onclick="eliminarProducto(${index})">Eliminar</button>
                            </td>
                        </tr>
                    `
            )
            .join("")}
            </tbody>
        </table>
    `;
}

function abrirModalProducto() {
    productoEnEdicion = null;
    document.getElementById("productoForm").reset();
    document.getElementById("productoModal").style.display = "flex";
}

function cerrarModalProducto() {
    document.getElementById("productoModal").style.display = "none";
}

function guardarProducto(event) {
    event.preventDefault();

    const producto = {
        nombre: document.getElementById("nombreProducto").value,
        descripcion: document.getElementById("descripcionProducto").value,
        categoria: document.getElementById("categoriaProducto").value,
        origen: document.getElementById("origenProducto").value
    };

    if (productoEnEdicion === null) {
        productos.push(producto);
    } else {
        productos[productoEnEdicion] = producto;
    }

    cerrarModalProducto();
    mostrarSeccion("producto");
}

function editarProducto(index) {
    productoEnEdicion = index;
    const producto = productos[index];

    document.getElementById("nombreProducto").value = producto.nombre;
    document.getElementById("descripcionProducto").value = producto.descripcion;
    document.getElementById("categoriaProducto").value = producto.categoria;
    document.getElementById("origenProducto").value = producto.origen;

    abrirModalProducto();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    mostrarSeccion("producto");
}

// ================================
// Funciones de Clientes
// ================================

function mostrarSeccionClientes(titulo, contenido) {
    titulo.textContent = "Clientes";
    contenido.innerHTML = `
        <button class="btn" onclick="abrirModalCliente()">Registrar Cliente</button>
        <h3>Lista de Clientes</h3>
        <table id="tablaClientes">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>RTN</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${clientes
            .map(
                (cliente, index) => `
                        <tr>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.correo}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.direccion}</td>
                            <td>${cliente.rtn}</td>
                            <td>
                                <button class="btn" onclick="editarCliente(${index})">Editar</button>
                                <button class="btn cancelar" onclick="eliminarCliente(${index})">Eliminar</button>
                            </td>
                        </tr>
                    `
            )
            .join("")}
            </tbody>
        </table>
    `;
}

function abrirModalCliente() {
    clienteEnEdicion = null; // Reinicia la edición
    document.getElementById("clienteForm").reset(); // Resetea el formulario
    document.getElementById("clientesModal").style.display = "flex"; // Muestra el modal
}

function cerrarModalCliente() {
    document.getElementById("clientesModal").style.display = "none"; // Oculta el modal
}

function guardarCliente(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    // Obtiene los valores del formulario
    const cliente = {
        nombre: document.getElementById("nombreCliente").value,
        correo: document.getElementById("correoElectronico").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        rtn: document.getElementById("rtn").value
    };

    // Verifica si es un cliente nuevo o está en edición
    if (clienteEnEdicion === null) {
        clientes.push(cliente);
    } else {
        clientes[clienteEnEdicion] = cliente;
    }

    cerrarModalCliente(); // Cierra el modal
    mostrarSeccion("cliente"); // Actualiza la tabla de clientes
}

function editarCliente(index) {
    clienteEnEdicion = index; // Marca al cliente en edición
    const cliente = clientes[index]; // Obtiene los datos del cliente

    // Llena los campos del formulario con los datos del cliente
    document.getElementById("nombreCliente").value = cliente.nombre;
    document.getElementById("correoElectronico").value = cliente.correo;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("rtn").value = cliente.rtn;

    abrirModalCliente(); // Abre el modal para editar
}

function eliminarCliente(index) {
    clientes.splice(index, 1); // Elimina el cliente de la lista
    mostrarSeccion("cliente"); // Actualiza la tabla de clientes
}

// ================================
// Funciones de Inventario
// ================================