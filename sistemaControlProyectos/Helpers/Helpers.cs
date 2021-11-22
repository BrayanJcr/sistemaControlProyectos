using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.Helpers
{
    public static class Helpers
    {        public static MvcHtmlString ActionLinkAllow(this HtmlHelper helper)
        {

            StringBuilder sb = new StringBuilder();

            if (HttpContext.Current.Session["usuario"] != null)
            {
                SP_C_PROFESIONAL_Result sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["usuario"];

                List<SP_C_PROYECTOPROFESIONALIMAGEN_Result> listar = ProyectosModelo.Instancia.ListarProyectoProfesionalImagen(sUsuario.IDProfesional).ToList();
                foreach (SP_C_PROYECTOPROFESIONALIMAGEN_Result item in listar)
                {
                    sb.AppendLine("<div class='col-md-4 col-sm-6 col-xs-6 col-xxs-12 work-item' >");
                    sb.AppendLine("<a onClick='GuardarProyectoActual(" + sUsuario.IDProfesional + "," + sUsuario.DNI + "," + sUsuario.IDCargo + ","+item.IDProyecto + ")' href='javascript:;'> ");
                    sb.AppendLine("<input type='hidden' id='txtIDProyecto' value=" + item.IDProyecto + "/>");
                    sb.AppendLine("<img src='"+item.imagen+ "' alt='Free HTML5 Website Template by FreeHTML5.co' class='img-responsive' height=50px  id='data''>");
                    sb.AppendLine("<h3 class='fh5co - work - title'>"+item.titProyecto+"</h3>");
                    sb.AppendLine("<p>"+item.descripcion+"</p>");
                    sb.AppendLine("</a>");
                    sb.AppendLine("</div>");            
                }


            }


            return new MvcHtmlString(sb.ToString());
        }
        public static MvcHtmlString ActionLinkAllowPermisos(this HtmlHelper helper)
        {

            StringBuilder sb = new StringBuilder();

            if (HttpContext.Current.Session["usuario"] != null)
            {
                SP_C_PROFESIONAL_Result sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["usuario"];

                tblProfesional rptprofesional = ProfesionalModelo.instancia.DetalleProfesional(sUsuario.IDProfesional);
                foreach (tblMenu item in rptprofesional.OListaMenu)
                {

                    sb.AppendLine("<li class='sidebar-dropdown'>");
                    sb.AppendLine("<a href = 'javascript:;' >");
                    sb.AppendLine("<i class='"+item.Icono+"'></i>");
                    sb.AppendLine("<span>"+item.NombreMenu+"</span>");
                    sb.AppendLine("</a>");
                    sb.AppendLine("<div class='sidebar-submenu'>");
                    sb.AppendLine("<ul>");
                    foreach (tblSubMenu subitem in item.tblSubMenu)
                    {
                        
                        sb.AppendLine("<li>");
                        if (subitem.Activo == true)
                        {
                            sb.AppendLine("<a href='/"+subitem.Controlador+"/"+subitem.Vista+"'>"+subitem.NombreSubMenu+"</a>");

                        }
                        sb.AppendLine("</li>");                   
                    }
                    sb.AppendLine("</ul>");
                    sb.AppendLine("</div>");
                    sb.AppendLine("</li>");

                }


            }


            return new MvcHtmlString(sb.ToString());
        }
        public static MvcHtmlString ActionLinkNuevo(this HtmlHelper helper)
        {

            StringBuilder sb = new StringBuilder();

            if (HttpContext.Current.Session["profesional"] != null)
            {
                SP_C_PROFESIONAL_Result sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["profesional"];

                List<SP_C_ACTIVIDAD_Result> lista = ActividadesModelo.Instancia.ListarActividad().Where(a => a.IDProyecto == sUsuario.IDProyectoActual).ToList();
                int i =1;
                foreach (SP_C_ACTIVIDAD_Result item in lista)
                {
                  
                    if (item.proceso == "Nuevo" && item.estado==true)
                    {
                        sb.AppendLine("<div class='list-item' id='taskNuevo-"+i+ "' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" + item.titActividad);
                        sb.AppendLine("<input id=" + item.IDActividad + " type='hidden'/>");
                        sb.AppendLine("<p>" + item.Descripcion + "</p>"); 
                        sb.AppendLine("</div>");
                        i++;
                    }

                }

            }


            return new MvcHtmlString(sb.ToString());
        }
        public static MvcHtmlString ActionLinkProceso(this HtmlHelper helper)
        {

            StringBuilder sb = new StringBuilder();

            if (HttpContext.Current.Session["profesional"] != null)
            {
                SP_C_PROFESIONAL_Result sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["profesional"];

                List<SP_C_ACTIVIDAD_Result> lista =ActividadesModelo.Instancia.ListarActividad().Where(a => a.IDProyecto == sUsuario.IDProyectoActual).ToList();
                int i = 1;
                foreach (SP_C_ACTIVIDAD_Result item in lista)
                {

                    if (item.proceso == "Proceso" && item.estado == true)
                    {
                        sb.AppendLine("<div class='list-item' id='taskProceso-" + i + "' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" + item.titActividad);
                        sb.AppendLine("<input id=" + item.IDActividad + " type='hidden'/>");
                        sb.AppendLine("<p>" + item.Descripcion + "</p>");
                        sb.AppendLine("</div>");
                        i++;
                    }   

                }

            }

            return new MvcHtmlString(sb.ToString());
        }
        public static MvcHtmlString ActionLinkTerminado(this HtmlHelper helper)
        {

            StringBuilder sb = new StringBuilder();

            if (HttpContext.Current.Session["profesional"] != null)
            {
                SP_C_PROFESIONAL_Result sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["profesional"];

                List<SP_C_ACTIVIDAD_Result> lista = ActividadesModelo.Instancia.ListarActividad().Where(a => a.IDProyecto == sUsuario.IDProyectoActual).ToList();
                int i = 1;
                foreach (SP_C_ACTIVIDAD_Result item in lista)
                {
                    if (item.proceso == "Terminado" && item.estado == true)
                    {
                        sb.AppendLine("<div class='list-item' id='taskTerminado-" + i + "' draggable='true' ondragstart='start(event)' ondragend='end(event)'>" + item.titActividad);
                        sb.AppendLine("<input id=" + item.IDActividad + " type='hidden'/>");
                        sb.AppendLine("<p>" + item.Descripcion + "</p>"); 
                        sb.AppendLine("</div>");
                        i++;
                    }

                }

            }


            return new MvcHtmlString(sb.ToString());
        }
    }
   
}

