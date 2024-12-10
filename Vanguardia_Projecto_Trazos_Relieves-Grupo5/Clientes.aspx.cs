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
    public partial class Clientes : System.Web.UI.Page
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
        public static string llenarTablaConBotones()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT cliente_id, nombre, correo, telefono, direccion, estado FROM clientes";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Cliente> clientes = new List<Cliente>();

                    while (reader.Read())
                    {
                        clientes.Add(new Cliente
                        {
                            ClienteId = Convert.ToInt32(reader["cliente_id"]),
                            Nombre = reader["nombre"].ToString(),
                            Correo = reader["correo"].ToString(),
                            Telefono = reader["telefono"].ToString(),
                            Direccion = reader["direccion"].ToString(),
                            Estado = Convert.ToInt32(reader["estado"])
                        });
                    }

                    return new JavaScriptSerializer().Serialize(clientes);
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string ObtenerCliente(int cliente_id)
        {
            Cliente cliente = null;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT cliente_id, nombre, correo, telefono, direccion, estado FROM clientes WHERE cliente_id = @cliente_id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@cliente_id", cliente_id);

                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    cliente = new Cliente
                    {
                        ClienteId = Convert.ToInt32(reader["cliente_id"]),
                        Nombre = reader["nombre"].ToString(),
                        Correo = reader["correo"].ToString(),
                        Telefono = reader["telefono"].ToString(),
                        Direccion = reader["direccion"].ToString(),
                        Estado = Convert.ToInt32(reader["estado"])
                    };
                }
            }

            return new JavaScriptSerializer().Serialize(cliente);
        }


        [WebMethod(EnableSession = true)]
        public static string AgregarCliente(Cliente cliente)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            INSERT INTO clientes (nombre, correo, telefono, direccion, estado)
            VALUES (@nombre, @correo, @telefono, @direccion, @estado)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@nombre", cliente.Nombre);
                    cmd.Parameters.AddWithValue("@correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("@telefono", cliente.Telefono);
                    cmd.Parameters.AddWithValue("@direccion", cliente.Direccion);
                    cmd.Parameters.AddWithValue("@estado", cliente.Estado);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    return rowsAffected > 0
                        ? "Cliente agregado exitosamente."
                        : "No se pudo agregar el cliente.";
                }
            }
        }
        /*
        [WebMethod(EnableSession = true)]
        public static string EditarCliente(Cliente cliente)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
            UPDATE clientes
            SET nombre = @nombre,
                correo = @correo,
                telefono = @telefono,
                direccion = @direccion,
                estado = @estado
            WHERE cliente_id = @cliente_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@cliente_id", cliente.ClienteId);
                    cmd.Parameters.AddWithValue("@nombre", cliente.Nombre);
                    cmd.Parameters.AddWithValue("@correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("@telefono", cliente.Telefono);
                    cmd.Parameters.AddWithValue("@direccion", cliente.Direccion);
                    cmd.Parameters.AddWithValue("@estado", cliente.Estado);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    return rowsAffected > 0
                        ? "Cliente editado exitosamente."
                        : "No se pudo editar el cliente.";
                }
            }
        }*/
        [WebMethod(EnableSession = true)]
        public static string EditarCliente(Dictionary<string, object> cliente)
        {
            System.Diagnostics.Debug.WriteLine("Datos recibidos:");
            foreach (var key in cliente.Keys)
            {
                System.Diagnostics.Debug.WriteLine($"{key}: {cliente[key]}");
            }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
        UPDATE clientes
        SET nombre = @nombre,
            correo = @correo,
            telefono = @telefono,
            direccion = @direccion,
            estado = @estado
        WHERE cliente_id = @cliente_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@cliente_id", Convert.ToInt32(cliente["cliente_id"]));
                    cmd.Parameters.AddWithValue("@nombre", cliente["nombre"].ToString());
                    cmd.Parameters.AddWithValue("@correo", cliente["correo"].ToString());
                    cmd.Parameters.AddWithValue("@telefono", cliente["telefono"].ToString());
                    cmd.Parameters.AddWithValue("@direccion", cliente["direccion"].ToString());
                    cmd.Parameters.AddWithValue("@estado", Convert.ToInt32(cliente["estado"]));

                    int rowsAffected = cmd.ExecuteNonQuery();

                    return rowsAffected > 0
                        ? "Cliente editado exitosamente."
                        : "No se pudo editar el cliente.";
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string EliminarCliente(int cliente_id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "DELETE FROM clientes WHERE cliente_id = @cliente_id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@cliente_id", cliente_id);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return "Cliente eliminado exitosamente.";
                    }
                    else
                    {
                        return "No se pudo eliminar el cliente.";
                    }
                }
            }
        }

        //Funcion para ventas
        [WebMethod]
        public static string CargarClientes()
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT cliente_id, nombre FROM clientes";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<object> clientes = new List<object>();

                    while (reader.Read())
                    {
                        clientes.Add(new
                        {
                            ClienteId = Convert.ToInt32(reader["cliente_id"]),
                            Nombre = reader["nombre"].ToString()
                        });
                    }

                    return new JavaScriptSerializer().Serialize(clientes);
                }
            }
        }

    }
}