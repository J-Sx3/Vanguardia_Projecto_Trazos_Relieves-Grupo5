<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Reportes.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos.Reportes" %>

<asp:Content ID="ContenidoReportes" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <div class="container mt-4">
        <h1>Bienvenido, <%= Session["nombre"] %>!</h1>
        <p>Estas en la pantalla de Reportes.</p>
    </div>
</asp:Content>
