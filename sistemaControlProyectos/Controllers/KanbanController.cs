using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    [Route("/api/[controller]")]
    public class KanbanController : Controller
    {
        // GET: Kanban
        
        public ActionResult Kanban()
        {
            return View();
        }
    }
}