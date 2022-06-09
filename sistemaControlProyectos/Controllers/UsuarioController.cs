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
            List<tblUsuario> listarActividad = new List<tblUsuario>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                //listarActividad = db.SP_C_AREA().ToList();
                listarActividad = (from p in db.tblUsuario select p).ToList();
            }
            return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);
            //List<SP_C_USUARIO_Result> listar = UsuarioModelo.instancia.ListarUsuario()
            
            //return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
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
        }

        [HttpPost]
        public JsonResult Guardar(tblUsuario objeto,string documento)
        {

            JsonResult listar = Obtener(objeto.DNI);

            bool respuesta = true;

            if (listar.Data == null)
            {
                    respuesta = UsuarioModelo.instancia.RegistrarUsuario(objeto, documento);
            }
            else
            {
                respuesta = UsuarioModelo.instancia.ModificarProfesional(objeto,documento);
            }
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(string DNI)
        {
            bool respuesta = true;
            respuesta = UsuarioModelo.instancia.EliminarUsuario(DNI);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
    }
}