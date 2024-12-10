'use strict'
$(document).ready(function () {
    llenarTablaConBotones();
    $("#btnAgregarCliente").on("click", function () {
        AgregarCliente();
    });

})
// Referencia al tbody de la tabla
const tbody = document.querySelector("#tablaClientes tbody");

// Función para llenar la tabla con botones dinámicos
function llenarTablaConBotones() {
    $.ajax({
        url: "Clientes.aspx/llenarTablaConBotones", // Ruta del método WebMethod
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const datos = JSON.parse(response.d); // Parsear el JSON devuelto por el WebMethod
            tbody.innerHTML = ""; // Limpiar la tabla

            // Crear filas dinámicas
            datos.forEach((item) => {
                const fila = document.createElement("tr");

                // Crear celdas para cada campo
                fila.innerHTML = `
                    <td>${item.ClienteId}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Correo}</td>
                    <td>${item.Telefono}</td>
                    <td>${item.Direccion}</td>
                    <td>${item.Estado === 1 ? "Activo" : "Inactivo"}</td>
                    <td>
                        <button class="btnEditar" data-id="${item.ClienteId}" data-toggle="modal" data-target="#modalEditarCliente">Editar</button>
                    </td>
                    <td>
                        <button class="btnBorrar" data-id="${item.ClienteId}">Borrar</button>
                    </td>
                `;

                tbody.appendChild(fila); // Agregar fila a la tabla
            });

            // Agregar eventos a los botones
            $(".btnEditar").on("click", function () {
                const ClienteId = $(this).data("id");
                cargarDatosCliente(ClienteId); // Llama a la función para cargar los datos del cliente
            });

            $(".btnBorrar").on("click", function () {
                const ClienteId = $(this).data("id");
                mostrarConfirmacionEliminar(ClienteId); // Llama a la función para confirmar la eliminación
            });
        },
        error: function (error) {
            console.error("Error al llenar la tabla:", error);
        }
    });
}

function getCliente() {
    return {
        nombre: $("#nombreCliente").val(),         // Captura del input del nombre
        correo: $("#correoCliente").val(),         // Captura del input del correo
        telefono: $("#celCliente").val(),          // Captura del input del teléfono
        direccion: $("#direccionCliente").val(),   // Captura del input de la dirección
        estado: $("#estadoCliente").val()          // Captura del estado (Activo/Inactivo)
    };
}
function AgregarCliente() {
    const cliente = getCliente(); // Obtener los datos del formulario

    $.ajax({
        url: "Clientes.aspx/AgregarCliente", // URL del método en el backend
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cliente: cliente }), // Convertir los datos a JSON
        success: function (response) {
            mensajeExitoAgregarCliente(response.d); // Mensaje de éxito
            llenarTablaConBotones(); // Actualizar la tabla
            $('#modalAgregarCliente').modal('hide'); // Cerrar el modal
        },
        error: function (error) {
            console.error("Error al agregar cliente:", error.responseText);
            mensajeErrorAgregarCliente("Error: " + error.responseText); // Mostrar mensaje de error
        }
    });
}

function cargarDatosCliente(clienteId) {
    $.ajax({
        url: "Clientes.aspx/ObtenerCliente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cliente_id: clienteId }), // Usa el nombre correcto del parámetro
        success: function (response) {
            const cliente = JSON.parse(response.d);
            // Rellenar los campos del modal con los datos del cliente
            $("#inputIdCliente").val(cliente.ClienteId); // Campo oculto para el ID
            $("#editarNombreCliente").val(cliente.Nombre);
            $("#editarCorreoCliente").val(cliente.Correo);
            $("#editarTelefonoCliente").val(cliente.Telefono);
            $("#editarDireccionCliente").val(cliente.Direccion);
            $("#editarEstadoCliente").val(cliente.Estado);

            // Mostrar el modal
            $('#modalEditarCliente').modal('show');
        },
        error: function (error) {
            console.error("Error al cargar datos del cliente:", error.responseText);
        }
    });
}


function EditarCliente() {
    const cliente = {
        cliente_id: $("#inputIdCliente").val(),
        nombre: $("#editarNombreCliente").val(),
        correo: $("#editarCorreoCliente").val(),
        telefono: $("#editarTelefonoCliente").val(),
        direccion: $("#editarDireccionCliente").val(),
        estado: $("#editarEstadoCliente").val()
    };

    console.log("Datos enviados al backend:", cliente);

    $.ajax({
        url: "Clientes.aspx/EditarCliente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cliente: cliente }),
        success: function (response) {
            console.log("Respuesta del backend:", response);
            mensajeExitoEditarCliente(response.d);
            llenarTablaConBotones(); // Actualizar la tabla de clientes
            $('#modalEditarCliente').modal('hide'); // Cerrar el modal
        },
        error: function (error) {
            console.error("Error al editar cliente:", error.responseText);
            mensajeErrorEditarCliente("Error: " + error.responseText);
        }
    });
}


function BorrarCliente(clienteId) {
    $.ajax({
        url: "Clientes.aspx/EliminarCliente", // URL del método en el backend
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cliente_id: clienteId }), // Enviar el cliente_id como JSON
        success: function (response) {
            mensajeExitoBorrarCliente(response.d); // Mensaje de éxito
            llenarTablaConBotones(); // Actualizar la tabla de clientes
        },
        error: function (error) {
            console.error("Error al eliminar cliente:", error.responseText);
            mensajeErrorBorrarCliente("Error: " + error.responseText); // Mostrar mensaje de error
        }
    });
}

function mostrarConfirmacionEliminar(clienteId) {
    swal({
        title: "¿Desea borrar este cliente?",
        text: "Esta acción no puede deshacerse",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "No, cancelar",
    }, function (isConfirm) {
        if (isConfirm) {
            BorrarCliente(clienteId); // Llama a la función para eliminar el cliente
        }
    });
}

// Mensajes de Alertas

function mensajeExitoAgregarCliente(mensaje) {
    swal({
        title: "El ingreso del cliente fue exitoso",
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


function mensajeErrorAgregarCliente(mensaje) {
    swal({
        title: "Error al ingresar el cliente",
        text: mensaje,
        type: "error"
    });
};

function mensajeExitoEditarCliente(mensaje) {
    swal({
        title: "La edicion del cliente fue exitoso",
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


function mensajeErrorEditarCliente(mensaje) {
    swal({
        title: "Error al editar el cliente",
        text: mensaje,
        type: "error"
    });
};

function mensajeExitoBorrarCliente(mensaje) {
    swal({
        title: "El cliente fue borrado exitosamente",
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


function mensajeErrorBorrarCliente(mensaje) {
    swal({
        title: "Error al borrar el cliente",
        text: mensaje,
        type: "error"
    });
};