using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Management;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos
{
    public partial class Product : System.Web.UI.Page
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
        public static string ObtenerProducto(int producto_id)
        {
            Producto producto = null;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT producto_id, nombre, descripcion, categoria, precio, origen, cantidad_disponible FROM productos WHERE producto_id = @producto_id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@producto_id", producto_id);

                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    producto = new Producto
                    {
                        producto_id = Convert.ToInt32(reader["producto_id"]),
                        Nombre = reader["nombre"].ToString(),
                        Descripcion = reader["descripcion"].ToString(),
                        Categoria = reader["categoria"].ToString(),
                        Precio = reader["precio"] != DBNull.Value ? Convert.ToDecimal(reader["precio"]) : 0m,
                        Origen = reader["origen"].ToString(),
                        Cantidad = Convert.ToInt32(reader["cantidad_disponible"])
                    };
                }
            }

            return new JavaScriptSerializer().Serialize(producto);
        }


        [WebMethod(EnableSession = true)]
        public static string llenarTablaConBotones()
        {
            List<Producto> productos = new List<Producto>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT producto_id, nombre, descripcion, categoria, precio, origen, cantidad_disponible FROM productos";
                SqlCommand cmd = new SqlCommand(query, connection);

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    productos.Add(new Producto()
                    {
                        producto_id = Convert.ToInt32(reader["producto_id"]),
                        Nombre = reader["nombre"].ToString(),
                        Descripcion = reader["descripcion"].ToString(),
                        Categoria = reader["categoria"].ToString(),
                        Precio = reader["precio"] != DBNull.Value ? Convert.ToDecimal(reader["precio"]) : 0m,  // Verificar si es nulo
                        Origen = reader["origen"].ToString(),
                        Cantidad = Convert.ToInt32(reader["cantidad_disponible"]),
                    });
                }
            }

            return new JavaScriptSerializer().Serialize(productos);
        }
        [WebMethod(EnableSession = true)]
        public static string AgregarProducto(Producto producto)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            INSERT INTO productos (nombre, descripcion, precio, origen, categoria, cantidad_disponible)
            VALUES (@nombre, @descripcion, @precio, @origen, @categoria, @cantidad)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    // Agregar parámetros con valores seguros
                    cmd.Parameters.AddWithValue("@nombre", producto.Nombre);
                    cmd.Parameters.AddWithValue("@descripcion", producto.Descripcion);
                    cmd.Parameters.AddWithValue("@precio", producto.Precio);
                    cmd.Parameters.AddWithValue("@origen", producto.Origen);
                    cmd.Parameters.AddWithValue("@categoria", producto.Categoria);
                    cmd.Parameters.AddWithValue("@cantidad", producto.Cantidad);

                    // Ejecutar el comando
                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return "Producto agregado exitosamente.";
                    }
                    else
                    {
                        return "No se pudo agregar el producto.";
                    }
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string EditarProducto(Producto producto)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            UPDATE productos
            SET nombre = @nombre,
                descripcion = @descripcion,
                categoria = @categoria,
                precio = @precio,
                origen = @origen,
                cantidad_disponible = @cantidad
            WHERE producto_id = @producto_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@producto_id", producto.producto_id);
                    cmd.Parameters.AddWithValue("@nombre", producto.Nombre);
                    cmd.Parameters.AddWithValue("@descripcion", producto.Descripcion);
                    cmd.Parameters.AddWithValue("@categoria", producto.Categoria);
                    cmd.Parameters.AddWithValue("@precio", producto.Precio);
                    cmd.Parameters.AddWithValue("@origen", producto.Origen);
                    cmd.Parameters.AddWithValue("@cantidad", producto.Cantidad);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return "Producto editado exitosamente.";
                    }
                    else
                    {
                        return "No se pudo editar el producto.";
                    }
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string EliminarProducto(int producto_id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "DELETE FROM productos WHERE producto_id = @producto_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@producto_id", producto_id);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return "Producto eliminado exitosamente.";
                    }
                    else
                    {
                        return "No se pudo eliminar el producto.";
                    }
                }
            }
        }
        [WebMethod]
        public static string llenarTablaProductos()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT producto_id, nombre FROM productos";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<object> productos = new List<object>();

                    while (reader.Read())
                    {
                        productos.Add(new
                        {
                            ProductoId = Convert.ToInt32(reader["producto_id"]),
                            Nombre = reader["nombre"].ToString()
                        });
                    }

                    return new JavaScriptSerializer().Serialize(productos);
                }
            }
        }

        // funciones para ventas
        [WebMethod(EnableSession = true)]
        public static string CargarProductosDropdown()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT producto_id, nombre FROM productos";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<object> productos = new List<object>();

                    while (reader.Read())
                    {
                        productos.Add(new
                        {
                            ProductoId = Convert.ToInt32(reader["producto_id"]),
                            Nombre = reader["nombre"].ToString()
                        });
                    }

                    return new JavaScriptSerializer().Serialize(productos);
                }
            }
        }


    }
}