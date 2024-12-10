<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="principal.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.principal" %>

<asp:Content ID="ContenidoPrincipal" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <div class="container mt-4">
        <h1>Bienvenido, <%= Session["nombre"] %>!</h1>
        <p>Seleccione una opción en el menú para navegar.</p>
    </div>
</asp:Content>
