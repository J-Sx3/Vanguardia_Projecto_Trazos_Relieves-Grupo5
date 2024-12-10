<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Productos.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos.Product" %>

<asp:Content ID="ContenidoProductos" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <!-- Botón fijo fuera de la tabla -->
<div class="text-right mb-3">
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAgregarProducto">
        Agregar Producto
    </button>
</div>

<!-- Modal para agregar un producto -->
<div class="modal fade" id="modalAgregarProducto" tabindex="-1" role="dialog" aria-labelledby="modalAgregarProductoLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAgregarProductoLabel">Agregar Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario de agregar producto -->
                <form id="formAgregarProducto">
                    <div class="form-group">
                        <label for="nombreProducto">Nombre</label>
                        <input type="text" class="form-control" id="nombreProducto" placeholder="Ingrese el nombre del producto" required="" />
                    </div>
                    <div class="form-group">
                        <label for="descripcionProducto">Descripción</label>
                        <textarea class="form-control" id="descripcionProducto" placeholder="Ingrese la descripción del producto" required=""></textarea>
                    </div>
                    <div class="form-group">
                        <label for="categoriaProducto">Categoría</label>
                        <select class="form-control" id="categoriaProducto" required="">
                            <option value="" disabled="" selected="">Seleccione una categoría</option>
                            <option value="Pintura">Pintura</option>
                            <option value="Escultura">Escultura</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="precioProducto">Precio</label>
                        <input type="number" class="form-control" id="precioProducto" placeholder="Ingrese el precio del producto" required="" />
                    </div>
                    <div class="form-group">
                        <label for="origenProducto">Origen</label>
                        <select class="form-control" id="origenProducto" required="">
                            <option value="" disabled="" selected="">Seleccione un origen</option>
                            <option value="nacional">Nacional</option>
                            <option value="internacional">Internacional</option>
                        </select>
                    </div>
                     <div class="form-group">
                        <label for="cantidadProducto">Cantidad Disponible</label>
                        <input type="number" class="form-control" id="cantidadProducto" placeholder="Ingrese la cantidad del producto" required="" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- Botón Cancelar -->
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <!-- Botón Aceptar -->
                <button id="btnAgregarProducto" type="button" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>


<table id="tablaProductos" class="table table-striped">
    <thead>
        <tr>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Origen</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <!-- Datos dinámicos -->
    </tbody>
</table>

    <!-- Modal para Editar Producto -->
<div class="modal fade" id="modalEditarProducto" tabindex="-1" aria-labelledby="modalEditarProductoLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarProductoLabel">Editar Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarProducto">
                    <input type="hidden" id="inputIdProducto" />
                    <div class="mb-3">
                        <label for="inputNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre" required="" />
                    </div>
                    <div class="mb-3">
                        <label for="inputDescripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="inputDescripcion" rows="3" required=""></textarea>
                    </div>
                    <div class="mb-3">
                        <select class="form-control" id="inputCategoria" required="">
                            <option value="" disabled="" selected="">Seleccione una categoría</option>
                            <option value="Pintura">Pintura</option>
                            <option value="Escultura">Escultura</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="inputPrecio" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="inputPrecio" required="" />
                    </div>
                    <div class="mb-3">
                    <label for="inputOrigen">Origen</label>
                       <select class="form-control" id="inputOrigen" required="">
                           <option value="" disabled="" selected="">Seleccione un origen</option>
                           <option value="nacional">Nacional</option>
                           <option value="internacional">Internacional</option>
                       </select>
                    </div>
                    <div class="mb-3">
                        <label for="inputCantidad" class="form-label">Cantidad Disponible</label>
                        <input type="number" class="form-control" id="inputCantidad" required="" />
                    </div>
                    <div class="modal-footer">
                        <!-- Botón Cancelar -->
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <!-- Botón Aceptar -->
                        <button type="button" class="btn btn-primary" onclick="EditarProducto()">Guardar</button>
                    </div>
                    </form>
            </div>
        </div>
    </div>
</div>

    <script src="js/Productos/productos.js"></script>
</asp:Content>