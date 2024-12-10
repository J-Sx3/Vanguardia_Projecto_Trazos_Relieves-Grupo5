<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Declaraciones.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos.Declaraciones" %>

<asp:Content ID="ContenidoDeclaraciones" ContentPlaceHolderID="ContenidoPrincipal" runat="server">
    <div class="container mt-4">
        <h1>Bienvenido, <%= Session["nombre"] %>!</h1>
        <p>Estas en la pantalla de Declaraciones.</p>
    </div>
</asp:Content>
