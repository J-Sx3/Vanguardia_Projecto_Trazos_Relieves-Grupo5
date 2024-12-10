'use strict'
$(document).ready(function () {
    llenarTablaVentas();
    $('#modalAgregarVenta').on('show.bs.modal', function () {
        cargarProductosDropdown();
        cargarClientes();
    });
    cargarProductos();

    $("#productoDropdown").on("change", function () {
        const productoId = $(this).val();
        const precioUnitario = $("#productoDropdown option:selected").data("precio");
        $("#precioUnitario").val(precioUnitario);

        calcularSubtotalYTotal();
    });

    $("#cantidadProducto").on("input", function () {
        calcularSubtotalYTotal();
    });

    function calcularSubtotalYTotal() {
        const cantidad = parseInt($("#cantidadProducto").val());
        const precioUnitario = parseFloat($("#precioUnitario").val());
        const impuesto = $("#productoDropdown option:selected").data("impuesto");

        if (cantidad && precioUnitario) {
            const subtotal = cantidad * precioUnitario;
            $("#subtotal").val(subtotal.toFixed(2));

            const montoTotal = subtotal * (1 + impuesto);
            $("#montoTotal").val(montoTotal.toFixed(2));
        }
    }

    // Escuchar cambios en el dropdown de productos y la cantidad
    $("#dropdownProducto, #cantidadVenta").on("change", function () {
        const productoId = $("#dropdownProducto").val();
        const cantidad = $("#cantidadVenta").val();

        if (productoId) {
            // Obtener detalles del producto
            $.ajax({
                url: "Productos.aspx/ObtenerProducto",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ producto_id: productoId }),
                success: function (response) {
                    const producto = JSON.parse(response.d);
                    const precioUnitario = producto.Precio || 0;
                    const subtotal = precioUnitario * cantidad;

                    // Obtener el porcentaje de impuesto
                    const origenImpuesto = producto.Origen.toLowerCase();
                    const porcentajeImpuesto = origenImpuesto === "nacional" ? 0.15 : 0.18;
                    const montoTotal = subtotal + (subtotal * porcentajeImpuesto);

                    // Actualizar los campos en el modal
                    $("#precioUnitario").val(precioUnitario.toFixed(2));
                    $("#subtotalVenta").val(subtotal.toFixed(2));
                    $("#montoTotalVenta").val(montoTotal.toFixed(2));
                },
                error: function (error) {
                    console.error("Error al obtener producto:", error.responseText);
                }
            });
        }
    });
});


function calcularValores() {
    const cantidad = parseInt($("#cantidadVenta").val()) || 0;
    const precioUnitario = parseFloat($("#precioUnitario").val()) || 0;
    const porcentajeImpuesto = parseFloat($("#porcentajeImpuesto").val()) || 0; // Asegúrate de obtener el valor del impuesto.

    const subtotal = cantidad * precioUnitario;
    const montoTotal = subtotal * (1 + porcentajeImpuesto);

    // Asignar valores calculados
    $("#subtotalVenta").val(subtotal.toFixed(2));
    $("#montoTotalVenta").val(montoTotal.toFixed(2));
}

$("#cantidadVenta").on("input", calcularValores);
$("#dropdownProducto").on("change", function () {
    const precioUnitario = parseFloat($("#dropdownProducto option:selected").data("precio")) || 0;
    $("#precioUnitario").val(precioUnitario.toFixed(2));
    calcularValores();
});

// Cargar clientes en el dropdown
function cargarClientes() {
    $.ajax({
        url: "Clientes.aspx/CargarClientes",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}), // No enviar parámetros
        success: function (response) {
            const clientes = JSON.parse(response.d);
            const dropdown = $("#clienteDropdown");

            dropdown.empty();
            dropdown.append('<option value="" selected disabled>Seleccione un cliente</option>');

            clientes.forEach((cliente) => {
                dropdown.append(`<option value="${cliente.ClienteId}">${cliente.Nombre}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar clientes:", error.responseText);
        }
    });
}

function cargarProductos() {
    $.ajax({
        url: "Productos.aspx/llenarTablaProductos",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            const productos = JSON.parse(response.d);
            const dropdown = $("#productoVenta");
            dropdown.empty(); // Limpiar el dropdown

            dropdown.append('<option value="" disabled selected>Seleccione un producto</option>');
            productos.forEach((producto) => {
                dropdown.append(`<option value="${producto.producto_id}">${producto.Nombre}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar productos:", error.responseText);
        }
    });
}

function cargarProductosDropdown() {
    $.ajax({
        url: "Productos.aspx/CargarProductosDropdown", // URL del método WebMethod
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const productos = JSON.parse(response.d); // Parsear la respuesta
            const dropdown = document.querySelector("#productoDropdown"); // Selecciona el dropdown

            // Limpia el contenido previo
            dropdown.innerHTML = '<option value="" disabled selected>Seleccione un producto</option>';

            // Llena el dropdown con las opciones
            productos.forEach((producto) => {
                const option = document.createElement("option");
                option.value = producto.ProductoId;
                option.textContent = producto.Nombre;
                dropdown.appendChild(option);
            });
        },
        error: function (error) {
            console.error("Error al cargar productos en el dropdown:", error.responseText);
        }
    });
}

// Llama a la función cuando se carga el modal
$('#modalAgregarVenta').on('show.bs.modal', function () {
    cargarProductosDropdown();
});



// Llenar la tabla de ventas
function llenarTablaVentas() {
    $.ajax({
        url: "Ventas.aspx/llenarTablaVentas",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const datos = JSON.parse(response.d);
            const tbody = document.querySelector("#tablaVentas tbody");
            tbody.innerHTML = "";

            datos.forEach((venta) => {
                const fila = `
                    <tr>
                        <td>${venta.VentaId}</td>
                        <td>${venta.UsuarioNombre}</td>
                        <td>${venta.ClienteNombre}</td>
                        <td>${venta.ProductoNombre}</td>
                        <td>${venta.FechaVenta}</td>
                        <td>${venta.MontoTotal.toFixed(2)}</td>
                        <td>${venta.EstadoVenta}</td>
                    </tr>`;
                tbody.innerHTML += fila;
            });
        },
        error: function (error) {
            console.error("Error al llenar la tabla de ventas:", error.responseText);
        }
    });
}



// Agregar una nueva venta
function AgregarVenta() {
    const detalles = [{
        ProductoId: $("#dropdownProducto").val(),
        Cantidad: $("#cantidadVenta").val(),
        PrecioUnitario: $("#precioUnitario").val(),
        Subtotal: $("#subtotalVenta").val()
    }];

    const venta = {
        UsuarioId: $("#usuarioId").val(),
        ClienteId: $("#dropdownCliente").val(),
        EstadoVenta: $("#dropdownEstado").val(),
        MontoTotal: $("#montoTotalVenta").val(),
        DetallesVenta: detalles
    };

    $.ajax({
        url: "Ventas.aspx/InsertarVenta",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ venta: venta }),
        success: function (response) {
            alert(response.d);
            $('#modalAgregarVenta').modal('hide');
            llenarTablaVentas();
        },
        error: function (error) {
            console.error("Error al registrar venta:", error.responseText);
            alert("Error al registrar la venta: " + error.responseText);
        }
    });

}




