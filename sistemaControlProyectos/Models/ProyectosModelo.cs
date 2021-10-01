using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class ProyectosModelo
    {
        public static ProyectosModelo _instancia = null;

        private ProyectosModelo()
        {

        }
        public static ProyectosModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ProyectosModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_PROYECTO_Result> ListarProyecto()
        {
            List<SP_C_PROYECTO_Result> listarProyecto = new List<SP_C_PROYECTO_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarProyecto = db.SP_C_PROYECTO().ToList();

                    return listarProyecto;

                }
                catch (Exception ex)
                {
                    listarProyecto = null;
                    return listarProyecto;
                }
        }
    }
}