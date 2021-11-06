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
        private static SP_C_PROFESIONAL_Result SesionUsuario;
        public ActionResult Area()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            ViewBag.Cargo = SesionUsuario.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionUsuario.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
            return View();
        }

        public ActionResult Organigrama()
        {
            ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            ViewBag.Cargo = SesionUsuario.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionUsuario.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
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

            List<SP_C_AREA_Result> listar = AreaModelo.Instancia.ListarArea();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarAreaPadre()
        {
            List<SP_C_AREAPADRE_Result> listar = AreaModelo.Instancia.ListarAreaPadre();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Obtener(int idArea)
        {
            tblArea ObtenerArea = new tblArea();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                ObtenerArea = (from p in db.tblArea.Where(x => x.IDArea == idArea)
                                    select p).FirstOrDefault();
            }

            return Json(ObtenerArea, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblArea objeto)
        {
            bool respuesta = false;

            if (objeto.IDArea == 0)
            {
                respuesta = Models.AreaModelo.Instancia.RegistrarArea(objeto);
            }
            else
            {
                respuesta = Models.AreaModelo.Instancia.ModificarArea(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(int IDArea)
        {
            bool respuesta = true;
            respuesta = Models.AreaModelo.Instancia.EliminarArea(IDArea);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}