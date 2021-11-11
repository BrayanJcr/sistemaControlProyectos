using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sistemaControlProyectos.Models;

namespace sistemaControlProyectos.Controllers
{
    public class PermisosController : Controller
    {
        // GET: Permisos
        private LoginController p = new LoginController();
        public ActionResult Permisos()
        {
            return p.MenuSession(View());
        }

        public JsonResult Listar(int IDCargo)
        {
            List<SP_C_PERMISOS_Result> listar = PermisosModelo.Instancia.ListarPermisos(IDCargo);
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(string xml)
        {
            bool respuesta = false;

                respuesta = Models.PermisosModelo.Instancia.ModificarPermiso(xml);
            
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

    }
}
