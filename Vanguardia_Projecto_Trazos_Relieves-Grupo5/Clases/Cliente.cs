using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases
{
    public class Cliente
    {
        public int ClienteId { get; set; }       // ID único del cliente (Primary Key)
        public string Nombre { get; set; }      // Nombre del cliente
        public string Correo { get; set; }      // Correo electrónico del cliente
        public string Telefono { get; set; }    // Teléfono del cliente
        public string Direccion { get; set; }   // Dirección física del cliente
        public int Estado { get; set; }         // Estado del cliente (1 = Activo, 0 = Inactivo)
    }
}