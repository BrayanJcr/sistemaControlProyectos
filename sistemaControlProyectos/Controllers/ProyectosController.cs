using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

namespace sistemaControlProyectos.Controllers
{
    public class ProyectosController : Controller
    {
        private static SP_C_PROFESIONAL_Result SesionUsuario;

        // GET: Proyectos
        public ActionResult Proyectos()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            ViewBag.Cargo = SesionUsuario.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionUsuario.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
            return View();
        }

        public ActionResult ProyectosInicio()
        {
            return View();
        }

        public JsonResult Obtener(int idProyecto)
        {
            tblProyecto ObtenerProyecto = new tblProyecto();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                ObtenerProyecto = (from p in db.tblProyecto.Where(x => x.IDProyecto == idProyecto)
                                   select p).FirstOrDefault();
            }

            return Json(ObtenerProyecto, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listar()
        {
            List<SP_C_PROYECTO_Result> lista = ProyectosModelo.Instancia.ListarProyecto();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getImage()
        {

            return null;
        }

        

    }
}