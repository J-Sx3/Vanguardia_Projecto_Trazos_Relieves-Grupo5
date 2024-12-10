using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases
{
    public class Venta
    {
        public int VentaId { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }
        public DateTime FechaVenta { get; set; }
        public string EstadoVenta { get; set; }
        public decimal MontoTotal { get; set; }
           // Lista de Detalles de Venta
        public List<DetalleVenta> DetallesVenta { get; set; }
    }
}