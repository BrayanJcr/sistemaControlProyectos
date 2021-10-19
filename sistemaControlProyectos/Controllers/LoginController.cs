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
            
             SP_C_USUARIO_Result listar = UsuarioModelo.instancia.ListarUsuario().Where(u=> u.DNI ==username && u.contraseña == password).FirstOrDefault();
             if (listar == null)
             {
                return View();
                    
             }


            Session["usuario"] = listar;
            return RedirectToAction("Index","Home");
        }
       

    }
}