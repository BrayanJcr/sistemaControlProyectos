using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class AreaController : Controller
    {
        // GET: Area
        public ActionResult Area()
        {
            return View();
        }

        public ActionResult Organigrama()
        {
            return View();
        }

        public JsonResult Listar()
        {
           // List<tblArea> listarActividad = new List<tblArea>();

           // using (DBControlProyectoEntities db = new DBControlProyectoEntities())
           // {

             //   listarActividad = db.SP_C_AREA().ToList();
                //listarActividad = (from p in db.tblArea select p).ToList();
            //}
            //return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);

            List<SP_C_AREA_Result> listar = AreaModelo.instancia.ListarArea();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
    }
}