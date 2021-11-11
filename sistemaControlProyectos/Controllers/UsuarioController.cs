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
        private LoginController p = new LoginController();

        public ActionResult Usuario()
        {
            return p.MenuSession(View());
        }
        public JsonResult Listar()
        {
            List<SP_C_PROFESIONAL_Result> listar = ProfesionalModelo.instancia.ListarProfesional();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Obtener(string dni)
        {

            tblUsuario oPersona = new tblUsuario();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                oPersona = (from p in db.tblUsuario.Where(x => x.DNI == dni)
                            select p).FirstOrDefault();
            }

            return Json(oPersona, JsonRequestBehavior.AllowGet);
            /*SP_C_USUARIODNI_Result list = ObtenerUsuario.instancia.ListarUsuarioid(dni);

            return Json(new { data=list}, JsonRequestBehavior.AllowGet);*/
        }

        [HttpPost]
        public JsonResult Guardar(tblUsuario objeto)
        {
            bool respuesta = true;

            if (objeto.DNI != null)
            {

                respuesta = UsuarioModelo.instancia.RegistrarUsuario(objeto);
            }
            


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Modificar(tblUsuario objeto)
        {
            bool respuesta = true;

            if (objeto.DNI == null)
            {
                        respuesta = UsuarioModelo.instancia.ModificarProfesional(objeto);
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