using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class ProyectosController : Controller
    {
        // GET: Proyectos
        public ActionResult Proyectos()
        {
            return View();
        }

        public JsonResult Listar()
        {
            List<SP_C_PROYECTO_Result> lista = Models.ProyectosModelo.Instancia.ListarProyecto();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

    }
}