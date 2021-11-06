using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class GanttController : Controller
    {
        // GET: Gantt
        private static SP_C_PROFESIONAL_Result SesionUsuario;

        public ActionResult Gantt()
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
            List<SP_C_ACTIVIDAD_Result> lista = Models.ActividadesModelo.Instancia.ListarActividad();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }
    }
}