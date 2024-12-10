<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Inventario.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos.Inventario" %>

<asp:Content ID="ContenidoInventario" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <div class="container mt-4">
        <h2>Inventario</h2>
        <table class="table table-striped" id="tablaInventario">
            <thead>
                <tr>
                    <th>Producto ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Cantidad Disponible</th>
                    <th>Origen</th>
                    <th>Fecha Creación</th>
                </tr>
            </thead>
            <tbody>
                <!-- Datos dinámicos -->
            </tbody>
        </table>
    </div>
</asp:Content>
