using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class ActividadesController : Controller
    {
        // GET: Actividades

        private static SP_C_PROFESIONAL_Result SesionProfesional;

        public ActionResult Actividades()
        {
            SesionProfesional = (SP_C_PROFESIONAL_Result)Session["profesional"];
            ViewBag.NombreUsuario = SesionProfesional.nombre + " " + SesionProfesional.apellidos;
            ViewBag.Cargo = SesionProfesional.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionProfesional.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
            return View();
        }

        public JsonResult Listar()
        {
            //List<SP_C_ACTIVIDAD_Result> listarActividad = new List<SP_C_ACTIVIDAD_Result>();

            //using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            //{

                //listarActividad = db.SP_C_ACTIVIDAD().ToList();
                //listarActividad = (from p in db.tblActividad select p).ToList();
            //}
            //return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);

            List<SP_C_ACTIVIDAD_Result> lista = Models.ActividadesModelo.Instancia.ListarActividad();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Obtener(int idActividad)
        {
            tblActividad ObtenerActividad = new tblActividad();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                ObtenerActividad = (from p in db.tblActividad.Where(x => x.IDActividad == idActividad)
                            select p).FirstOrDefault();
            }

            return Json(ObtenerActividad, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblActividad objeto)
        {
            bool respuesta = false;

            if (objeto.IDActividad == 0)
            {
                respuesta = Models.ActividadesModelo.Instancia.RegistrarActividad(objeto);
            }
            else
            {
                respuesta = Models.ActividadesModelo.Instancia.ModificarActividad(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(int IDActividad)
        {
            bool respuesta = true;
            respuesta = Models.ActividadesModelo.Instancia.EliminarActividad(IDActividad);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}