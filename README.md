Este Codigo consiste de nuestro proyecto Trazos y Relieves del Grupo # 5 Clase de Vanguardia.
Integrantes:
Juan Carlos Lagos
Shadia Corra Nassar
Sergio Arturo Padilla
Sara Nohemi Martinez

Para correr este proyecto precisa de la base de datos creando un nuevo usuario en el login. Una vez teniendo la misma base de datos y el usuario creado inicia el proyecto en Visual Studio Community
Abre el archivo Web.Config y al final hasta abajo tendra que cambiar los siguientes parametros:
  <connectionStrings>
    <add name="CnxServidorVanguardia" connectionString="Server=|El nombre de su servidor|; Database=TrazosRelievesDB;User=|el nombre de su usuario|;Password=|la contraseña de su usuario|"></add>
  </connectionStrings>

Una vez hecho esta configuracion podra iniciar el proyecto y tiene acceso a estos usuarios en la pantalla de login
admin 1234
juan 1234
shadia 1234
sara 1234
sergio 1234

Los modulos funcionales son los de productos y clientes. 
