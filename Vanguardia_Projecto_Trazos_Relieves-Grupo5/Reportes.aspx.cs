using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Vanguardia_Projecto_Trazos_Relieves_Grupo5.Modulos
{
    public partial class Reportes : System.Web.UI.Page
    {
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
    }
}