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

        private static SP_C_PROFESIONAL_Result SesionUsuario;
        private static SP_C_PROFESIONAL_Result SesionProfesional;


        // GET: Home
        public ActionResult Index()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["usuario"];
            if (Session["usuario"] != null)
            {
                SP_C_PROFESIONAL_Result listar = ProfesionalModelo.instancia.ListarProfesional().Where(u => u.DNI == SesionUsuario.DNI && u.contraseña == SesionUsuario.contraseña).FirstOrDefault();
                Session["profesional"] = listar;
            }
            


            return View();
        }
        public ActionResult Cerrar()
        {
            Session["usuario"] = null;
            return RedirectToAction("Login", "Login");
        }
        
    }
}