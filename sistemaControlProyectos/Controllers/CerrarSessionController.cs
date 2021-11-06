using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class CerrarSessionController : Controller
    {
        // GET: CerrarSession
        public ActionResult Cerrar()
        {
            Session["usuario"]=null;
            return RedirectToAction("Login","Login");
        }
    }
}