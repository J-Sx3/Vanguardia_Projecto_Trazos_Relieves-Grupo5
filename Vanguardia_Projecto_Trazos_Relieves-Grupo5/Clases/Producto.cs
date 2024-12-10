using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases
{
    public class Producto
    {

        public int producto_id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Categoria { get; set; }
        public decimal Precio { get; set; }
        public string Origen { get; set; }
        public int Cantidad { get; set; }

        public DateTime FechaCreacion { get; set; }
    }
}