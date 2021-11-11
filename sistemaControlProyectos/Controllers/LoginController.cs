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
        // GET: Login
        public ActionResult Login()
        {

            return View();
        }
        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            
             SP_C_PROFESIONAL_Result listar = ProfesionalModelo.instancia.ListarProfesional().Where(u=> u.DNI ==username && u.contraseña == password).FirstOrDefault();
             if (listar == null)
             {
                ViewBag.Error = "Usuario o contraseña Invalida";
                return View();     
             }
            Session["usuario"] = listar;
            return RedirectToAction("ProyectosInicio", "Proyectos");
        }
        

    }
}