using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sistemaControlProyectos.Models;
namespace sistemaControlProyectos.Controllers
{

    public class HomeController : Controller
    {
        private static SP_C_USUARIO_Result SesionUsuario;

        // GET: Home
        public ActionResult Index()
        {
            if (Session["usuario"] != null)
            {
                SesionUsuario = (SP_C_USUARIO_Result)Session["usuario"];
            }
            try
            {
                ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            }
            catch
            {

            }
            return View();
        }
    }
}