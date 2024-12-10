'use strict'

$(document).ready(function () {
    llenarTablaConBotones();
    $("#btnAgregarProducto").on("click", function () {
        AgregarProducto();
    });

})

// Función para llenar la tabla con botones dinámicos
// Referencia al tbody de la tabla
const tbody = document.querySelector("#tablaProductos tbody");

// Función para llenar la tabla con botones dinámicos (sin mostrar la cantidad)
function llenarTablaConBotones() {
    $.ajax({
        url: "Productos.aspx/llenarTablaConBotones", // Ruta del método WebMethod
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const datos = JSON.parse(response.d); // Parsear el JSON devuelto por el WebMethod
            tbody.innerHTML = ""; // Limpiar la tabla

            // Crear filas dinámicas
            datos.forEach((item) => {
                const fila = document.createElement("tr");

                // Crear celdas para cada campo (ocultando la columna de cantidad)
                fila.innerHTML = `
                    <td>${item.producto_id}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Descripcion}</td>
                    <td>${item.Categoria}</td>
                    <td>${item.Precio}</td>
                    <td>${item.Origen}</td>
                    <td>
                        <button class="btnEditar" data-id="${item.producto_id}" data-toggle="modal" data-target="#modalEditarProducto">Editar</button>
                    </td>
                    <td><button class="btnBorrar" data-id="${item.producto_id}">Borrar</button></td>
                `;

                tbody.appendChild(fila); // Agregar fila a la tabla
            });

            // Agregar eventos a los botones
            $(".btnEditar").on("click", function () {
                const productoId = $(this).data("id");
                cargarDatosProducto(productoId);
            });

            $(".btnBorrar").on("click", function () {
                const productoId = $(this).data("id");
                mostrarConfirmacionEliminar(productoId);
            });
        },
        error: function (error) {
            console.error("Error al llenar la tabla:", error);
        }
    });
}


function getProducto() {
    return{
        nombre: $("#nombreProducto").val(),         // Captura del input del nombre
        descripcion: $("#descripcionProducto").val(), // Captura del input de descripción
        precio: parseFloat($("#precioProducto").val()), // Conversión a número
        origen: $("#origenProducto").val(),        // Captura del origen
        categoria: $("#categoriaProducto").val(),   // Captura de la categoría
        cantidad: $("#cantidadProducto").val()  //Captura la cantidad del producto
    };

}

function AgregarProducto() {
    const producto = getProducto();

    $.ajax({
        url: "Productos.aspx/AgregarProducto",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ producto: producto }),
        success: function (response) {
            mensajeExitoAgregarProducto(response.d); // Mensaje de éxito
            llenarTablaConBotones(); // Actualizar la tabla
        },
        error: function (error) {
            console.error("Error al agregar producto:", error.responseText);
            mensajeErrorAgregarProducto("Error: " + error.responseText); // Mostrar mensaje de error
        }
    });
}



// Función para editar un producto
function cargarDatosProducto(productoId) {
    $.ajax({
        url: "Productos.aspx/ObtenerProducto",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ producto_id: productoId }),
        success: function (response) {
            const producto = JSON.parse(response.d);
            // Llenar los campos del modal con los datos del producto
            $("#inputIdProducto").val(producto.producto_id); // Campo oculto para ID
            $("#inputNombre").val(producto.Nombre);
            $("#inputDescripcion").val(producto.Descripcion);
            $("#inputCategoria").val(producto.Categoria);
            $("#inputPrecio").val(producto.Precio);
            $("#inputOrigen").val(producto.Origen);
            $("#inputCantidad").val(producto.Cantidad);

            // Mostrar el modal
            $('#modalEditarProducto').modal('show');
        },
        error: function (error) {
            console.error("Error al cargar datos del producto:", error.responseText);
        }
    });
}

function EditarProducto() {
    const productoEditar = {
        producto_id: $("#inputIdProducto").val(),
        nombre: $("#inputNombre").val(),
        descripcion: $("#inputDescripcion").val(),
        categoria: $("#inputCategoria").val(),
        precio: parseFloat($("#inputPrecio").val()),
        origen: $("#inputOrigen").val(),
        cantidad: parseInt($("#inputCantidad").val(), 10)
    };

    $.ajax({
        url: "Productos.aspx/EditarProducto",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ producto: productoEditar }),
        success: function (response) {
            mensajeExitoEditarProducto(response.d);
            llenarTablaConBotones(); // Actualizar la tabla
            $('#modalEditarProducto').modal('hide'); // Cerrar el modal
        },
        error: function (error) {
            console.error("Error al editar producto:", error.responseText);
            mensajeErrorEditarProducto("Error: " + error.responseText);
        }
    });
}


// Función para borrar un producto
function mostrarConfirmacionEliminar(productoId) {
    swal({
        title: "¿Desea borrar este producto?",
        text: "Esta acción no puede deshacerse",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "No, cancelar",
    }, function (isConfirm) {
        if (isConfirm) {
            BorrarProducto(productoId);
        }
    });
}
function BorrarProducto(productoId) {
    $.ajax({
        url: "Productos.aspx/EliminarProducto", // URL del método del backend
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ producto_id: productoId }), // Enviar el producto_id como JSON
        success: function (response) {
            mensajeExitoBorrarProducto(response.d); // Mensaje de éxito
            llenarTablaConBotones(); // Actualizar la tabla
        },
        error: function (error) {
            console.error("Error al eliminar producto:", error.responseText);
            mensajeErrorBorrarProducto("Error: " + error.responseText); // Mostrar mensaje de error
        }
    });
}


// Mensajes de Alertas

function mensajeExitoAgregarProducto(mensaje) {
    swal({
        title: "El ingreso del producto fue exitoso",
        text: mensaje,
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Salir",
        closeOnConfirm: false
    }, function () {
        // Refrescar la tabla
        llenarTablaConBotones();

        // Cerrar la alerta
        swal.close();
    });
}


function mensajeErrorAgregarProducto(mensaje) {
    swal({
        title: "Error al ingresar el producto",
        text: mensaje,
        type: "error"
    });
};

function mensajeExitoEditarProducto(mensaje) {
    swal({
        title: "La edicion del producto fue exitoso",
        text: mensaje,
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Salir",
        closeOnConfirm: false
    }, function () {
        // Refrescar la tabla
        llenarTablaConBotones();

        // Cerrar la alerta
        swal.close();
    });
}


function mensajeErrorEditarProducto(mensaje) {
    swal({
        title: "Error al editar el producto",
        text: mensaje,
        type: "error"
    });
};

function mensajeExitoBorrarProducto(mensaje) {
    swal({
        title: "El producto fue borrado exitosamente",
        text: mensaje,
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Salir",
        closeOnConfirm: false
    }, function () {
        // Refrescar la tabla
        llenarTablaConBotones();

        // Cerrar la alerta
        swal.close();
    });
}


function mensajeErrorBorrarProducto(mensaje) {
    swal({
        title: "Error al borrar el producto",
        text: mensaje,
        type: "error"
    });
};