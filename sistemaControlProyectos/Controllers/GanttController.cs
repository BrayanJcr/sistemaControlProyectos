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
        public ActionResult Gantt()
        {
            return View();
        }
        public JsonResult Listar()
        {
            List<SP_C_ACTIVIDAD_Result> lista = Models.ActividadesModelo.Instancia.ListarActividad();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }
    }
}