'use strict'

'use strict';

// Referencia al tbody de la tabla
const tbody = document.querySelector("#tablaInventario tbody");

// Función para llenar la tabla dinámicamente
'use strict';

// Referencia al tbody de la tabla
const tbody = document.querySelector("#tablaInventario tbody");

// Función para llenar la tabla dinámicamente
function llenarTablaInventario() {
    $.ajax({
        url: "Inventario.aspx/LlenarTablaInventario", // Ruta del WebMethod
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const datos = JSON.parse(response.d); // Parsear la respuesta JSON
            tbody.innerHTML = ""; // Limpiar la tabla

            // Crear filas dinámicas
            datos.forEach((producto) => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${producto.ProductoId}</td>
                    <td>${producto.Nombre}</td>
                    <td>${producto.Categoria}</td>
                    <td>${producto.CantidadDisponible}</td>
                    <td>${producto.Origen}</td>
                    <td>${new Date(producto.FechaCreacion).toLocaleDateString()}</td>
                `;

                tbody.appendChild(fila); // Agregar fila a la tabla
            });
        },
        error: function (error) {
            console.error("Error al llenar la tabla de inventario:", error.responseText);
        }
    });
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", llenarTablaInventario);


// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", llenarTablaInventario);
