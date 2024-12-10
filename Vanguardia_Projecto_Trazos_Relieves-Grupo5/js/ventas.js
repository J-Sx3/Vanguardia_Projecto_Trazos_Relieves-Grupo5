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


function openModal() {
    ventaEnEdicion = null;
    document.getElementById("ventaForm").reset();
    document.getElementById('detalleVentaModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('detalleVentaModal').style.display = 'none';
}

function submitForm() {
    const form = document.getElementById('ventaForm');
    if (form.checkValidity()) {
        alert('Venta registrada con éxito');
        form.reset();
        closeModal();
    } else {
        alert('Por favor, complete todos los campos correctamente.');
    }
}