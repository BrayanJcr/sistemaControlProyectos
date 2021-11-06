using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sistemaControlProyectos.Models;
namespace sistemaControlProyectos.Controllers
{
    public class CargoController : Controller
    {
        // GET: Cargo
        private static SP_C_PROFESIONAL_Result SesionUsuario;

        public ActionResult Cargo()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            ViewBag.Cargo = SesionUsuario.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionUsuario.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
            return View();
        }

        public JsonResult Listar()
        {
            

            List<SP_C_CARGO_Result> listar = CargoModelo.instancia.ListarCargo();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
    }
}