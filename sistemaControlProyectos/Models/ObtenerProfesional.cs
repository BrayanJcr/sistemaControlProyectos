using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sistemaControlProyectos.Models;
namespace sistemaControlProyectos.Models
{
    public class ObtenerProfesional
    {
        public static ObtenerProfesional _instancia = null;
        private ObtenerProfesional()
        {

        }

        public static ObtenerProfesional instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ObtenerProfesional();
                }
                return _instancia;
            }
        }

        public SP_C_PROFESIONALID_Result ListarProfesionalid(int idprofesional)
        {
            SP_C_PROFESIONALID_Result listarProfesional = new SP_C_PROFESIONALID_Result();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarProfesional = db.SP_C_PROFESIONALID(idprofesional).FirstOrDefault();
                    return listarProfesional;
                }
                catch (Exception ex)
                {
                    listarProfesional = null;
                    return listarProfesional;
                }

            }
        }
    }
}