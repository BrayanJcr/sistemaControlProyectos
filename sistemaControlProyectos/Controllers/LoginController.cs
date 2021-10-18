using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class LoginController : Controller
    {
        private static tblUsuario SesionUsuario;

        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            try
            {
                SP_C_USUARIO_Result listar = UsuarioModelo.instancia.ListarUsuario().Where(u=>u.DNI=username && u.pas);
                if (listar.Count() == 1)
                {
                    Session["usuario"] = username;
                    return Redirect("Inicio");
                }
                else
                {
                    return View();
                }
                
            }catch(Exception ex)
            {
                return Content("ocurrio un Error :(" + ex.Message);
            }
        }
        public ActionResult Inicio()
        {
            if (Session["usuario"] != null)
            {
                @ViewBag.usuario = Session["usuario"];
            }
            return View();
        }

    }
}