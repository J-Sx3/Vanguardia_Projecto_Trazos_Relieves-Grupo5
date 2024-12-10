<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Clientes.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos.Clientes" %>

<asp:Content ID="ContenidoClientes" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <!-- Botón fijo fuera de la tabla -->
<div class="text-right mb-3">
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAgregarCliente">
        Agregar Cliente
    </button>
</div>

<!-- Modal para agregar un cliente -->
<div class="modal fade" id="modalAgregarCliente" tabindex="-1" role="dialog" aria-labelledby="modalAgregarClienteLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAgregarClienteLabel">Agregar Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario de agregar producto -->
                <form id="formAgregarCliente">
                    <div class="form-group">
                        <label for="nombreCliente">Nombre</label>
                        <input type="text" class="form-control" id="nombreCliente" placeholder="Ingrese el nombre del cliente" required="" />
                    </div>
                    <div class="form-group">
                        <label for="correoCliente">Correo</label>
                        <textarea class="form-control" id="correoCliente" placeholder="Ingrese el correo del cliente" required=""></textarea>
                    </div>
                    <div class="form-group">
                        <label for="celCliente">Telefono</label>
                        <input type="number" class="form-control" id="celCliente" placeholder="Ingrese el numero de telefono del Cliente" required="" />
                    </div>
                    <div class="form-group">
                        <label for="direccionCliente">Direccion</label>
                        <textarea class="form-control" id="direccionCliente" placeholder="Ingrese la ubicacion del cliente" required=""></textarea>
                    </div>
                    <div class="form-group">
                        <label for="estadoCliente">Estado</label>
                        <select class="form-control" id="estadoCliente" required="">
                            <option value="" disabled="" selected="">Seleccione si el cliente es activo o inactivo</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- Botón Cancelar -->
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <!-- Botón Aceptar -->
                <button id="btnAgregarCliente" type="button" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>


   <table id="tablaClientes">
       <thead>
           <tr>
               <th>Codigo Cliente</th>
               <th>Nombre</th>
               <th>Correo</th>
               <th>Telefono</th>
               <th>Direccion</th>
               <th>Estado</th>
           </tr>
       </thead>
       <tbody>
           <!--Datos de la Tabla Clientes -->
       </tbody>
   </table>
    <!-- Modal para Editar Clientes -->
<div class="modal fade" id="modalEditarCliente" tabindex="-1" aria-labelledby="modalEditarClienteLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarClienteLabel">Editar Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarCliente">
                    <!-- Campo oculto para almacenar el ID del cliente -->
                    <input type="hidden" id="inputIdCliente" />

                    <div class="mb-3">
                        <label for="editarNombreCliente" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="editarNombreCliente" required="" />
                    </div>
                    <div class="mb-3">
                        <label for="editarCorreoCliente" class="form-label">Correo</label>
                        <input type="email" class="form-control" id="editarCorreoCliente" required="" />
                    </div>
                    <div class="mb-3">
                        <label for="editarTelefonoCliente" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="editarTelefonoCliente" required="" />
                    </div>
                    <div class="mb-3">
                        <label for="editarDireccionCliente" class="form-label">Dirección</label>
                        <textarea class="form-control" id="editarDireccionCliente" rows="3" required=""></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="editarEstadoCliente" class="form-label">Estado</label>
                        <select class="form-control" id="editarEstadoCliente" required="">
                            <option value="" disabled="" selected="">Seleccione el estado del cliente</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- Botón Cancelar -->
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <!-- Botón Guardar -->
                <button type="button" class="btn btn-primary" onclick="EditarCliente()">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>

    <script src="js/Clientes/clientes.js"></script>
</asp:Content>
