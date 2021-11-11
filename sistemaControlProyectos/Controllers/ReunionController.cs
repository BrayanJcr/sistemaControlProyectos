using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class ReunionController : Controller
    {
        // GET: Reunion
        private LoginController p = new LoginController();

        public ActionResult Reunion()
        {
            return p.MenuSession(View());
        }
    }
}