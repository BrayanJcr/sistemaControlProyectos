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

        public ActionResult Actividades()
        {
            return View();
        }

        public ActionResult AsignarResponsable()
        {
            return View();
        }
        public ActionResult AsignarRecursos()
        {
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

        // Asignacion de Responsable

        [HttpGet]
        public JsonResult ListarAsignacion()
        {
            List<SP_C_ProfesionalActividad_Result> lista = Models.ActividadesModelo.Instancia.ListarActividadResponsable();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GuardarActividadResponsable(tblProfesional_Actividad objeto)
        {
            bool respuesta = false;

            respuesta = Models.ActividadesModelo.Instancia.RegistrarActividadResponsable(objeto);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult EliminarActividadResponsable(int idProfActividad)
        {
            bool respuesta = true;
            respuesta = Models.ActividadesModelo.Instancia.EliminarAsigResponsa(idProfActividad);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        // Asignacion de Recursos

        [HttpGet]
        public JsonResult ListarAsignacionRecurso()
        {
            List<SP_C_RECURSO_ACTIVIDAD_Result> lista = Models.ActividadesModelo.Instancia.ListarActividadRescurso();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GuardarActividadRecurso(tblRecurso_Actividad objeto)
        {
            bool respuesta = false;

            respuesta = Models.ActividadesModelo.Instancia.RegistrarActividadRecurso(objeto);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult EliminarActividadRecurso(int idRecActividad)
        {
            bool respuesta = true;
            respuesta = Models.ActividadesModelo.Instancia.EliminarAsigRecurso(idRecActividad);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}