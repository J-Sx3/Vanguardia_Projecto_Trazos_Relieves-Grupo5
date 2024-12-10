'use strict'

window.addEventListener('load', function () {

    var boton = document.querySelector("#loginForm");

    boton.addEventListener('submit', function (e) {
        var v_usuario = document.querySelector("#Usuario");
        var v_clave = document.querySelector("#Contraseña");

        console.log("Entramos a la logica del inicio ");

        $.ajax({
            type: "POST",
            url: 'Login.aspx/LoginIngresa',
            cache: false,
            contentType: "application/json;",
            dataType: "json",
            data: JSON.stringify({ usuario: v_usuario.value, clave: v_clave.value }),
            error: function (jqXHR, textStatus, errorThrown) {

            },
            success: function (data) {
                var fila = data.d;
                console.log(data);

                if (fila.CodigoError == 1) {
                    
                    mensajeExito(fila.Datos[0].DU_Nombre);
                } else {
                    mensajeError(fila.Mensaje);
                }

            }
        });
    });
});

function mensajeExito(mensaje) {
    swal({
        title: "Bienvenido " + mensaje,
        text: "El ingreso fue exitoso",
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Continuar",
        closeOnConfirm: false
    }, function () {
        window.location.replace('principal.aspx');
       
    });
};

function mensajeError(mensaje) {
    swal({
        title: "Error al Ingresar",
        text: mensaje,
        type: "error"
    });
};
