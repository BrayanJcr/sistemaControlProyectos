using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sistemaControlProyectos.Models;

namespace sistemaControlProyectos.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Usuario()
        {
            return View();
        }
        public JsonResult Listar()
        {
            

            List<SP_C_USUARIO_Result> listar = UsuarioModelo.instancia.ListarUsuario();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Obtener(string dni)
        {

            /*tblusuario oPersona = new tblusuario();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                oPersona = (from p in db.tblusuario.Where(x => x.DNI == dni)
                            select p).FirstOrDefault();
            }

            return Json(oPersona, JsonRequestBehavior.AllowGet);*/
            SP_C_USUARIODNI_Result list = ObtenerUsuario.instancia.ListarUsuarioid(dni);

            return Json(new { data=list}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Guardar(tblProfesional objeto)
        {
            bool respuesta = true;

            if (objeto.DNI == "")
            {

                respuesta = ProfesionalModelo.instancia.RegistrarProfesional(objeto);
            }
            else
            {
                respuesta = ProfesionalModelo.instancia.ModificarProfesional(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Eliminar(int idprofesional)
        {
            bool respuesta = true;
            respuesta = ProfesionalModelo.instancia.EliminarProfesional(idprofesional);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}