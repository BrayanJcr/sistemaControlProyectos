using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sistemaControlProyectos.Models;
namespace sistemaControlProyectos.Controllers
{
    public class CargoController : Controller
    {
        // GET: Cargo
        private static SP_C_PROFESIONAL_Result SesionUsuario;

        public ActionResult Cargo()
        {
            SesionUsuario = (SP_C_PROFESIONAL_Result)Session["profesional"];
            ViewBag.NombreUsuario = SesionUsuario.nombre + " " + SesionUsuario.apellidos;
            ViewBag.Cargo = SesionUsuario.nomCargo;
            SP_C_PROYECTO_Result proyecto = ProyectosModelo.Instancia.ListarProyecto().Where(p => p.IDProyecto == SesionUsuario.IDProyectoActual).FirstOrDefault();

            ViewBag.proyecto = proyecto.titProyecto;
            return View();
        }

        public JsonResult Listar()
        {
            List<SP_C_CARGO_Result> listar = CargoModelo.Instancia.ListarCargo();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Obtener(int idCargo)
        {
            tblCargo Obtener = new tblCargo();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                Obtener = (from p in db.tblCargo.Where(x => x.IDCargo == idCargo)
                           select p).FirstOrDefault();
            }

            return Json(Obtener, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblCargo objeto)
        {
            bool respuesta = false;

            if (objeto.IDCargo == 0)
            {
                respuesta = Models.CargoModelo.Instancia.RegistrarCargo(objeto);
            }
            else
            {
                respuesta = Models.CargoModelo.Instancia.ModificarCargo(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Eliminar(int IDCargo)
        {
            bool respuesta = true;
            respuesta = Models.CargoModelo.Instancia.EliminarCargo(IDCargo);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}