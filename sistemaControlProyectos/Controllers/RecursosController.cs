using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class RecursosController : Controller
    {
        // GET: Recursos
        public ActionResult Recursos()
        {
            return View();
        }

        public JsonResult Listar()
        {
            List<SP_C_RECURSO_Result> listar = RecursoModelo.Instancia.ListarRecurso();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Obtener(int idRecurso)
        {
            tblRecurso Obtener = new tblRecurso();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                Obtener = (from p in db.tblRecurso.Where(x => x.IDRecurso == idRecurso)
                               select p).FirstOrDefault();
            }

            return Json(Obtener, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblRecurso objeto)
        {
            bool respuesta = false;

            if (objeto.IDRecurso == 0)
            {
                respuesta = Models.RecursoModelo.Instancia.RegistrarRecurso(objeto);
            }
            else
            {
                respuesta = Models.RecursoModelo.Instancia.ModificarRecurso(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Eliminar(int IDRecurso)
        {
            bool respuesta = true;
            respuesta = Models.RecursoModelo.Instancia.EliminarRecurso(IDRecurso);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}