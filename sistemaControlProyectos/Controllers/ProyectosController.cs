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

        public ActionResult AsignarProfesional()
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
            //List<SP_C_PROYECTOLISTA_Result> listarActividad = new List<SP_C_PROYECTOLISTA_Result>();

            //using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            //{

            //    listarActividad = db.SP_C_PROYECTOLISTA().ToList();
            //    //listarActividad = (from p in db.tblActividad select p).ToList();
            //}
            //return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);

            List<SP_C_PROYECTOLISTA_Result> lista = Models.ProyectosModelo.Instancia.ListarTabla();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

       
        [HttpPost]
        public JsonResult Guardar(tblProyecto objeto)
        {
            bool respuesta = false;

            if (objeto.IDProyecto == 0)
            {
                respuesta = Models.ProyectosModelo.Instancia.RegistrarProyecto(objeto);
            }
            else
            {
                respuesta = Models.ProyectosModelo.Instancia.ModificarProyecto(objeto);
            }

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(int IDProyecto)
        {
            bool respuesta = true;
            respuesta = Models.ProyectosModelo.Instancia.EliminarProyecto(IDProyecto);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        // Asignacion de Profesional

        [HttpGet]
        public JsonResult ListarAsignacion()
        {
            List<SP_C_PROYECTOPROFESIONAL_Result> lista = Models.ProyectosModelo.Instancia.ListarProyectoProfesional();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GuardarProyectoProfes(tblProfesional_Proyecto objeto)
        {
            bool respuesta = false;

            respuesta = Models.ProyectosModelo.Instancia.RegistrarProyectoProfesional(objeto);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult EliminarProyectoProfes(int idProfeProyecto)
        {
            bool respuesta = true;
            respuesta = Models.ProyectosModelo.Instancia.EliminarAsigProfesional(idProfeProyecto);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }




    }
}