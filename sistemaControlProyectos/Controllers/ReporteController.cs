using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class ReporteController : Controller
    {
        // GET: Reporte
        private LoginController p = new LoginController();
        public ActionResult Reporte()
        {
            return p.MenuSession(View());
        }
        public ActionResult TablaRepo()
        {
            return p.MenuSession(View());
        }

        public JsonResult Listar()
        {
            //List<SP_C_REPORTE_Result> listarREPORTE = new List<SP_C_REPORTE_Result>();

            //using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            //{

            //listarREPORTE = db.SP_C_REPORTE().ToList();
            //listarREPORTE = (from p in db.tblREPORTE select p).ToList();
            //}
            //return Json(new { data = listarREPORTE }, JsonRequestBehavior.AllowGet);

            List<SP_C_REPORTE_Result> lista = Models.ReporteModelo.Instancia.ListarReporte();
            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Obtener(int IDReport)
        {
            tblReporte ObtenerREPORTE = new tblReporte();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                ObtenerREPORTE = (from p in db.tblReporte.Where(x => x.IDReport == IDReport)
                                  select p).FirstOrDefault();
            }

            return Json(ObtenerREPORTE, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]


        public JsonResult Eliminar(int IDREPORTE)
        {
            bool respuesta = true;
            respuesta = Models.ReporteModelo.Instancia.EliminarReporte(IDREPORTE);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblReporte objeto ,string xml)
        {
            bool respuesta = false;

            respuesta = Models.ReporteModelo.Instancia.RegistrarReporte(objeto,xml);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}