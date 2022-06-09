using sistemaControlProyectos.Controllers;
using sistemaControlProyectos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemaControlProyectos.filters
{
    public class VerificaSession : ActionFilterAttribute
    {
        private SP_C_PROFESIONAL_Result sUsuario;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            sUsuario = (SP_C_PROFESIONAL_Result)HttpContext.Current.Session["usuario"];

            if (sUsuario == null)
            {
                if (filterContext.Controller is LoginController == false)
                {
                    filterContext.HttpContext.Response.Redirect("~/Login/Login");
                }

            }
            else
            {

                if (filterContext.Controller is LoginController == true)
                {
                    filterContext.HttpContext.Response.Redirect("~/Home/Index");
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}