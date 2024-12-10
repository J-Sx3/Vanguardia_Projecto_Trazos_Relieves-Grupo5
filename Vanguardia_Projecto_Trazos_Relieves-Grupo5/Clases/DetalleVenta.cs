using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases
{
    public class DetalleVenta
    {

            public int DetalleId { get; set; } // Puede ser opcional si es generado automáticamente
            public int VentaId { get; set; }
            public int ProductoId { get; set; } // Referencia al Producto
            public int Cantidad { get; set; }
            public decimal PrecioUnitario { get; set; }
            public decimal Subtotal { get; set; }


}
}