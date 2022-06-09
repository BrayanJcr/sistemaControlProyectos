using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Controllers
{
    public class AreaController : Controller
    {
        // GET: Area
        private LoginController p = new LoginController();
        public ActionResult Area()
        {
            return p.MenuSession(View());
        }

        public ActionResult Organigrama()
        {
            return p.MenuSession(View());
        }

        public JsonResult Listar()
        {
           // List<tblArea> listarActividad = new List<tblArea>();

           // using (DBControlProyectoEntities db = new DBControlProyectoEntities())
           // {

             //   listarActividad = db.SP_C_AREA().ToList();
                //listarActividad = (from p in db.tblArea select p).ToList();
            //}
            //return Json(new { data = listarActividad }, JsonRequestBehavior.AllowGet);

            List<SP_C_AREA_Result> listar = AreaModelo.Instancia.ListarArea();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarAreaPadre()
        {
            List<SP_C_AREAPADRE_Result> listar = AreaModelo.Instancia.ListarAreaPadre();
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Obtener(int idArea)
        {
            List<SP_O_AREA_Result> listar = AreaModelo.Instancia.ObtenerArea(idArea);
            return Json(new { data = listar }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Guardar(tblArea objeto)
        {
            bool respuesta = false;

            if (objeto.IDArea == 0)
            {
                respuesta = Models.AreaModelo.Instancia.RegistrarArea(objeto);
            }
            else
            {
                respuesta = Models.AreaModelo.Instancia.ModificarArea(objeto);
            }


            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Eliminar(int IDArea)
        {
            bool respuesta = true;
            respuesta = AreaModelo.Instancia.EliminarArea(IDArea);
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ObtenerDatos(int IDArea)
        {
            List<Area> listar = datos(IDArea);
            return Json(listar, JsonRequestBehavior.AllowGet);
        }

        public List<Area> datos(int IDArea)
        {
            List<Area> area = null;
            if (IDArea == 0)
            {
                List<SP_C_AREAINICIO_Result> listar = AreaModelo.Instancia.ConsultarInicio().ToList();
                foreach (var list in listar)
                {
                    area = new List<Area>()
                    {
                        new Area()
                        {
                            id=list.IDArea,
                            puesto = list.nomArea,
                            nombre=list.nombre,
                            hijos=datosHijo(IDArea+1)
                        }
                    };
                }
            }
            else
            {
                IDArea += 1;
                List<SP_O_AREA_Result> listar = AreaModelo.Instancia.ObtenerArea(IDArea);
                foreach (var list in listar)
                {
                    area = new List<Area>()
                    {
                        new Area()
                        {
                            id=list.IDArea,
                            puesto = list.nomArea,
                            nombre=list.nombre,
                            hijos=datosHijo(IDArea)
                        }
                    };
                }
            }
            return area;
        }
        public Area[] datosHijo(int IDArea)
        {
            Area[] data;
            List<SP_C_HIJOS_Result> listar = AreaModelo.Instancia.ListarHijos(IDArea).ToList();
            if (listar.Count == 0)
            {
                data = new Area[0];
            }
            else
            {
                data = new Area[listar.Count];
                Area area;
                int i = 0;
                foreach (var list in listar)
                {

                    area = new Area()
                    {
                        id = list.IDArea,
                        puesto = list.nomArea,
                        nombre = list.nombre,
                        hijos = datosHijo(list.IDArea),
                    };
                    data[i] = area;
                    i++;
                }




            }
            return data;
        }
    }
}