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
        private static SP_C_PROFESIONAL_Result SesionUsuario;
        private LoginController p = new LoginController();
        public ActionResult Reporte()
        {
            return p.MenuSession(View());
        }
        public ActionResult Revisar()
        {
            return p.MenuSession(View());
        }

        public JsonResult Listar(String estado)
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            List<SP_C_REPORTE_Result> lista;

            if (estado != "Todo") {
                lista = Models.ReporteModelo.Instancia.ListarReporte((int)SesionUsuario.IDProyectoActual).Where(u => u.Estado == estado).ToList();
            }
            else
            {
                lista = Models.ReporteModelo.Instancia.ListarReporte((int)SesionUsuario.IDProyectoActual);
            }

            return Json(new { data = lista }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Obtener(int IDReport)
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            SP_C_REPORTE_Result ObtenerREPORTE;

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                ObtenerREPORTE = ReporteModelo.Instancia.ListarReporte((int)SesionUsuario.IDProyectoActual).Where(r => r.IDReport == IDReport).FirstOrDefault();
            }

            return Json(new { data = ObtenerREPORTE }, JsonRequestBehavior.AllowGet);
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
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            respuesta = Models.ReporteModelo.Instancia.RegistrarReporte(objeto,xml,SesionUsuario.IDProfesional);

            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}