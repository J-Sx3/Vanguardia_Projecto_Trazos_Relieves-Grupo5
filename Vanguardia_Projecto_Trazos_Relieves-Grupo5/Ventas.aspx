<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Ventas.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Ventas" %>

<asp:Content ID="ContenidoVentas" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
<div class="text-right mb-3">
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAgregarVenta">
        Agregar Venta
    </button>
    <button type="button" class="btn btn-primary" onclick="emitirFactura()">
        Emitir Factura
    </button>
</div>

<table id="tablaVentas" class="table table-striped">
    <thead>
        <tr>
            <th>ID Venta</th>
            <th>Usuario</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Fecha Venta</th>
            <th>Total</th>
            <th>Monto Total</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody>
        <!-- Datos dinámicos -->
    </tbody>
</table>

<div class="modal fade" id="modalAgregarVenta" tabindex="-1" role="dialog" aria-labelledby="modalAgregarVentaLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAgregarVentaLabel">Agregar Venta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formAgregarVenta">
                     <div class="form-group">
                         <label for="usuarioIdVenta">Usuario</label>
                        <input type="hidden" class="form-control" id="usuarioIdVenta" />
                    </div>
                    <div class="form-group">
                        <label for="clienteDropdown">Cliente</label>
                        <select class="form-control" id="clienteDropdown" required="">
                            <option value="" disabled="" selected="">Seleccione un cliente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="productoDropdown">Producto</label>
                        <select id="productoDropdown" class="form-control" required="">
                            <option value="" disabled="" selected="">Seleccione un producto</option>
                            <!-- Opciones dinámicas -->
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="cantidadProducto">Cantidad</label>
                        <input type="number" class="form-control" id="cantidadProducto" placeholder="Ingrese la cantidad" required="" />
                    </div>
                    <div class="form-group">
                        <label for="precioUnitario">Precio Unitario</label>
                        <input type="text" class="form-control" id="precioUnitario" disabled="" />
                    </div>
                    <div class="form-group">
                        <label for="subtotal">Subtotal</label>
                        <input type="text" class="form-control" id="subtotal" disabled="" />
                    </div>
                    <div class="form-group">
                        <label for="estadoVenta">Estado</label>
                        <select class="form-control" id="estadoVenta" required="">
                            <option value="" disabled="" selected="">Seleccione el estado</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="enviado">Enviado</option>
                            <option value="pagado">Pagado</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="montoTotal">Monto Total</label>
                        <input type="text" class="form-control" id="montoTotal" disabled="" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="AgregarVenta()">Aceptar</button>
            </div>
        </div>
    </div>
</div>

    <script src="js/Ventas/Ventas.js"></script>
</asp:Content>
