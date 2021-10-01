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
        public ActionResult Cargo()
        {
            return View();
        }

        public JsonResult Listar()
        {
            

            List<SP_C_CARGO_Result> listar = CargoModelo.instancia.ListarCargo();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
    }
}