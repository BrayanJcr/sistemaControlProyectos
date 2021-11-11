using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class Conexion
    {
        public static string CN = ConfigurationManager.ConnectionStrings["miconexion"].ConnectionString;
    }
}