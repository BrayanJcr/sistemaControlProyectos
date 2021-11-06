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
        private static SP_C_PROFESIONAL_Result SessionProfesional;

        // GET: Home
        public ActionResult Index()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["usuario"];
            if (Session["usuario"] != null)
            {
                SP_C_PROFESIONAL_Result listar = ProfesionalModelo.instancia.ListarProfesional().Where(u => u.DNI == SesionUsuario.DNI && u.contraseña == SesionUsuario.contraseña).FirstOrDefault();
                Session["profesional"] = listar;        
            }
            try
            {
                SessionProfesional = (SP_C_PROFESIONAL_Result)Session["profesional"];
                ViewBag.NombreUsuario = SessionProfesional.nombre + " " + SessionProfesional.apellidos;
                ViewBag.Cargo = SessionProfesional.nomCargo;    
                SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p=>p.IDProyecto== SessionProfesional.IDProyectoActual).FirstOrDefault();

                ViewBag.proyecto = proyecto.titProyecto;
            }
            catch
            {

            }
            return View();
        }
    }
}