<<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Vanguardia_Projecto_Trazos_Relieves_Grupo5.Login" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Trazos y Relieves | Iniciar Sesion</title>

    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />

    <link href="css/animate.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <!-- Sweet Alert -->
    <link href="css/plugins/sweetalert/sweetalert.css" rel="stylesheet" />
</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">Grupo #5</h1>

            </div>
            <h3>Bienvenido a Trazos y Relieves</h3>
            <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->
            </p>
            <p>Login in. To see it in action.</p>
            <form class="m-t" action="#" method="post" id="loginForm" onsubmit=" return false" runat="server">
                <div class="form-group">
                    <input type="text" id="Usuario" class="form-control" placeholder="Usuario" required="" />
                </div>
                <div class="form-group">
                   <input type="password" id="Contraseña" class="form-control" placeholder="Contraseña" required="" />
                </div>
                <button type="submit" id="Ingresar" class="btn btn-primary block full-width m-b">Ingresar</button>

                <a href="#"><small>Forgot password?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="#">Create an account</a>
            </form>
            <p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="js/CSS_Scripts/js/jquery-3.1.1.min.js"></script>
    <script src="js/CSS_Scripts/js/popper.min.js"></script>
    <script src="js/CSS_Scripts/js/bootstrap.js"></script>
    <!--Login Logica -->
    <script src="js/login.js"></script>
        <!-- Sweet alert -->
<script src="js/CSS_Scripts/js/plugins/sweetalert/sweetalert.min.js"></script>
</body>
</html>


