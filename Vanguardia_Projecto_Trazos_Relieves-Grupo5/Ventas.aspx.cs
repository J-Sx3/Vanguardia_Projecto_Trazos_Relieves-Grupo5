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

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5
{
    public partial class Ventas : System.Web.UI.Page
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
        public static int ObtenerUsuarioActual()
        {
            if (HttpContext.Current.Session["nombre"] != null)
            {
                string nombreUsuario = HttpContext.Current.Session["nombre"].ToString();

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT usuario_id FROM usuarios WHERE nombre = @nombre";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@nombre", nombreUsuario);
                        return Convert.ToInt32(cmd.ExecuteScalar());
                    }
                }
            }
            return -1; // Devuelve un valor inválido si no hay sesión activa
        }
        [WebMethod(EnableSession = true)]
        public static string ObtenerClientes()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT cliente_id, nombre FROM clientes WHERE estado = 1"; // Solo clientes activos

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Cliente> clientes = new List<Cliente>();

                    while (reader.Read())
                    {
                        clientes.Add(new Cliente
                        {
                            ClienteId = Convert.ToInt32(reader["cliente_id"]),
                            Nombre = reader["nombre"].ToString()
                        });
                    }

                    return new JavaScriptSerializer().Serialize(clientes);
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string llenarTablaVentas()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            SELECT 
                v.venta_id,
                u.nombre AS usuario_nombre,
                c.nombre AS cliente_nombre,
                p.nombre AS producto_nombre,
                v.fecha_venta,
                v.monto_total,
                v.estado_venta
            FROM ventas v
            INNER JOIN usuarios u ON v.usuario_id = u.usuario_id
            INNER JOIN clientes c ON v.cliente_id = c.cliente_id
            INNER JOIN detalle_venta dv ON v.venta_id = dv.venta_id
            INNER JOIN productos p ON dv.producto_id = p.producto_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<object> ventas = new List<object>();

                    while (reader.Read())
                    {
                        ventas.Add(new
                        {
                            VentaId = Convert.ToInt32(reader["venta_id"]),
                            UsuarioNombre = reader["usuario_nombre"].ToString(),
                            ClienteNombre = reader["cliente_nombre"].ToString(),
                            ProductoNombre = reader["producto_nombre"].ToString(),
                            FechaVenta = Convert.ToDateTime(reader["fecha_venta"]),
                            MontoTotal = Convert.ToDecimal(reader["monto_total"]),
                            EstadoVenta = reader["estado_venta"].ToString()
                        });
                    }

                    return new JavaScriptSerializer().Serialize(ventas);
                }
            }
        }



        [WebMethod(EnableSession = true)]
        public static string AgregarVenta(Venta venta)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string queryVenta = @"
        INSERT INTO ventas (usuario_id, cliente_id, fecha_venta, estado_venta, monto_total)
        VALUES (@usuario_id, @cliente_id, GETDATE(), @estado_venta, @monto_total);
        SELECT SCOPE_IDENTITY();";

                string queryDetalle = @"
        INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario, subtotal)
        VALUES (@venta_id, @producto_id, @cantidad, @precio_unitario, @subtotal);";

                using (SqlTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        // Insertar Venta
                        SqlCommand cmdVenta = new SqlCommand(queryVenta, conn, transaction);
                        cmdVenta.Parameters.AddWithValue("@usuario_id", venta.UsuarioId);
                        cmdVenta.Parameters.AddWithValue("@cliente_id", venta.ClienteId);
                        cmdVenta.Parameters.AddWithValue("@estado_venta", venta.EstadoVenta);
                        cmdVenta.Parameters.AddWithValue("@monto_total", venta.MontoTotal);

                        int ventaId = Convert.ToInt32(cmdVenta.ExecuteScalar());

                        // Insertar Detalles de Venta
                        foreach (var detalle in venta.DetallesVenta)
                        {
                            SqlCommand cmdDetalle = new SqlCommand(queryDetalle, conn, transaction);
                            cmdDetalle.Parameters.AddWithValue("@venta_id", ventaId);
                            cmdDetalle.Parameters.AddWithValue("@producto_id", detalle.ProductoId);
                            cmdDetalle.Parameters.AddWithValue("@cantidad", detalle.Cantidad);
                            cmdDetalle.Parameters.AddWithValue("@precio_unitario", detalle.PrecioUnitario);
                            cmdDetalle.Parameters.AddWithValue("@subtotal", detalle.Subtotal);

                            cmdDetalle.ExecuteNonQuery();
                        }

                        transaction.Commit();
                        return "Venta registrada exitosamente.";
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return "Error al registrar la venta: " + ex.Message;
                    }
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string InsertarVenta(Venta venta)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        // Validación de datos antes de la inserción
                        if (venta.DetallesVenta == null || !venta.DetallesVenta.Any())
                        {
                            throw new ArgumentException("No se enviaron detalles de venta.");
                        }

                        foreach (var detalle in venta.DetallesVenta)
                        {
                            if (detalle.PrecioUnitario <= 0 || detalle.Cantidad <= 0 || detalle.Subtotal <= 0)
                            {
                                throw new ArgumentException("Datos inválidos en los detalles de venta.");
                            }
                        }

                        // Insertar en la tabla de ventas
                        string queryVenta = @"
                INSERT INTO ventas (usuario_id, cliente_id, fecha_venta, estado_venta, monto_total)
                OUTPUT INSERTED.venta_id
                VALUES (@usuario_id, @cliente_id, GETDATE(), @estado_venta, @monto_total)";

                        using (SqlCommand cmdVenta = new SqlCommand(queryVenta, conn, transaction))
                        {
                            cmdVenta.Parameters.AddWithValue("@usuario_id", venta.UsuarioId);
                            cmdVenta.Parameters.AddWithValue("@cliente_id", venta.ClienteId);
                            cmdVenta.Parameters.AddWithValue("@estado_venta", venta.EstadoVenta);
                            cmdVenta.Parameters.AddWithValue("@monto_total", venta.MontoTotal);

                            int ventaId = (int)cmdVenta.ExecuteScalar(); // Obtiene el ID de la venta generada
                            venta.VentaId = ventaId; // Asignar el ID generado
                        }

                        // Insertar en la tabla de detalle_venta
                        string queryDetalle = @"
                INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario, subtotal)
                VALUES (@venta_id, @producto_id, @cantidad, @precio_unitario, @subtotal)";

                        foreach (var detalle in venta.DetallesVenta)
                        {
                            using (SqlCommand cmdDetalle = new SqlCommand(queryDetalle, conn, transaction))
                            {
                                cmdDetalle.Parameters.AddWithValue("@venta_id", venta.VentaId);
                                cmdDetalle.Parameters.AddWithValue("@producto_id", detalle.ProductoId);
                                cmdDetalle.Parameters.AddWithValue("@cantidad", detalle.Cantidad);
                                cmdDetalle.Parameters.AddWithValue("@precio_unitario", detalle.PrecioUnitario);
                                cmdDetalle.Parameters.AddWithValue("@subtotal", detalle.Subtotal);

                                cmdDetalle.ExecuteNonQuery();
                            }
                        }

                        transaction.Commit();
                        return "Venta registrada exitosamente.";
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return "Error al registrar venta: " + ex.Message;
                    }
                }
            }
        }




    }
}