using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    [Route("/api/[controller]")]
    public class ActividadesController : Controller
    {
        // GET: Actividades
        private static SP_C_PROFESIONAL_Result SesionUsuario;
        private LoginController p = new LoginController();

        public ActionResult Actividades()
        {
            return p.MenuSession(View());
        }

        public ActionResult Gantt()
        {
            return p.MenuSession(View());
        }

        public ActionResult Kanban()
        {
            return p.MenuSession(View());
        }

        public ActionResult AsignarResponsable()
        {
            return p.MenuSession(View());
        }
        public ActionResult AsignarRecursos()
        {
            return p.MenuSession(View());
        }
        public JsonResult Listar()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            List<SP_C_ACTIVIDAD_Result> lista = Models.ActividadesModelo.Instancia.ListarActividad().Where(a => a.IDProyecto== SesionUsuario.IDProyectoActual).ToList();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListarEstaEncar(bool estado)
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            List<SP_C_ACTIVIDADPROFENCAR_Result> lista = Models.ActividadesModelo.Instancia.ListarActividadEncar(SesionUsuario.IDProfesional).Where(a => a.IDProyecto == SesionUsuario.IDProyectoActual && a.estado == estado).ToList();
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
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            if (objeto.IDActividad == 0)
            {
                respuesta = Models.ActividadesModelo.Instancia.RegistrarActividad(objeto, (int)SesionUsuario.IDProyectoActual);
            }
            else
            {
                respuesta = Models.ActividadesModelo.Instancia.ModificarActividad(objeto, (int)SesionUsuario.IDProyectoActual);
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

        public JsonResult ModificarProceso(int IDActividad,string Proceso)
        {
            bool respuesta = true;
            respuesta = ActividadesModelo.Instancia.ModificarProceso(IDActividad, Proceso);
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