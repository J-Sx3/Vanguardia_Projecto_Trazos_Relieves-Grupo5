using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Vanguardia_Projecto_Trazos_Relieves_Grupo5.Clases;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod(EnableSession = true)]
        public static object LoginIngresa(string usuario, string clave)
        {
            try
            {
                string connectionString = ConfigurationManager.ConnectionStrings["CnxServidorVanguardia"].ConnectionString;

                string query = "SELECT nombre, contraseña, estado  FROM usuarios WHERE nombre = @PUsuario AND contraseña = @PClave";

                var Listausuarios = new List<Usuarios>();

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@PUsuario", usuario);
                        command.Parameters.AddWithValue("@PClave", clave);
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var ObjetoUsuario = new Usuarios
                                {
                                    DU_Nombre = reader["nombre"].ToString(),
                                    DU_Clave = reader["contraseña"].ToString(),
                                    DU_Estado = Convert.ToInt32(reader["estado"])
                                };
                                Listausuarios.Add(ObjetoUsuario);
                                HttpContext.Current.Session["nombre"] = ObjetoUsuario.DU_Nombre;
                                HttpContext.Current.Session["Estado"] = ObjetoUsuario.DU_Estado;

                            }
                        }
                    }

                }

                if (Listausuarios.Count > 0)
                {
                    return new { CodigoError = 1, Mensaje = "Usuario encontrado", Datos = Listausuarios };
                }
                else
                {
                    return new { CodigoError = -2, Mensaje = "Usuario no encontrado", Datos = Listausuarios };
                }

            }
            catch (Exception ex)
            {
                return new { CodigoError = -1, Mensaje = "Error tecnico de la base de datos " + ex.Message };
            }



        }
    }
}