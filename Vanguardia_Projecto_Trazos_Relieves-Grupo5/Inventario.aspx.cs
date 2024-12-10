using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos
{
    public partial class Inventario : System.Web.UI.Page
    {
        private static readonly string connectionString = ConfigurationManager.ConnectionStrings["CnxServidorVanguardia"].ConnectionString;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (HttpContext.Current.Session["nombre"] == null)
                {
                    Response.Redirect(String.Format("Login.aspx"));
                }
            }
        }
        [WebMethod(EnableSession = true)]
        public static string LlenarTablaInventario()
        {
            List<Producto> inventario = new List<Producto>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            SELECT producto_id, nombre, categoria, cantidad_disponible, origen, fecha_creacion
            FROM productos";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        inventario.Add(new Producto
                        {
                            producto_id = Convert.ToInt32(reader["producto_id"]),
                            Nombre = reader["nombre"].ToString(),
                            Categoria = reader["categoria"].ToString(),
                            Cantidad = Convert.ToInt32(reader["cantidad_disponible"]),
                            Origen = reader["origen"].ToString(),
                            FechaCreacion = Convert.ToDateTime(reader["fecha_creacion"])
                        });
                    }
                }
            }

            return new JavaScriptSerializer().Serialize(inventario);
        }

    }
}