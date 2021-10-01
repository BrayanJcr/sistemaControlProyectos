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
            try
            {
                List<SP_C_PROFESIONALLOGIN_Result> listar = ProfesionalModelo.instancia.ObtenerProfesional(username, password);
                if (listar.Count() > 0)
                {
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
            return View();
        }

    }
}