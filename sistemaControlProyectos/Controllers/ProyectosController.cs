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
        private LoginController p = new LoginController();

        // GET: Proyectos
        public ActionResult Proyectos()
        {
            return p.MenuSession(View());
        }

        public ActionResult ProyectosInicio()
        {
            return View();
        }

        public ActionResult AsignarProfesional()
        {
            return p.MenuSession(View());
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
            //List<SP_C_PROYECTOLISTA_Result> listarActividad = new List<SP_C_PROYECTOLISTA_Result>();

            //using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            //{

            //    listarActividad = db.SP_C_PROYECTOLISTA().ToList();
            //    //listarActividad = (from p in db.tblActividad select p).ToList();
            //}
            //return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);

            List<SP_C_PROYECTOLISTA_Result> lista = ProyectosModelo.Instancia.ListarTabla();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

       
        [HttpPost]
        public JsonResult Guardar(tblProyecto objeto)
        {
            bool respuesta;

            if (objeto.IDProyecto == 0)
            {
                respuesta = ProyectosModelo.Instancia.RegistrarProyecto(objeto);
            }
            else
            {
                respuesta = ProyectosModelo.Instancia.ModificarProyecto(objeto);
            }

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(int IDProyecto)
        {
            bool respuesta = ProyectosModelo.Instancia.EliminarProyecto(IDProyecto);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        // Asignacion de Profesional

        [HttpGet]
        public JsonResult ListarAsignacion()
        {
            List<SP_C_PROYECTOPROFESIONAL_Result> lista = ProyectosModelo.Instancia.ListarProyectoProfesional();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GuardarProyectoProfes(tblProfesional_Proyecto objeto)
        {
            bool respuesta = ProyectosModelo.Instancia.RegistrarProyectoProfesional(objeto);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult EliminarProyectoProfes(int idProfeProyecto)
        {
            bool respuesta = ProyectosModelo.Instancia.EliminarAsigProfesional(idProfeProyecto);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }




    }
}