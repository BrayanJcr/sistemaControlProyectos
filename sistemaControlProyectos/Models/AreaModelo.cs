using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class AreaModelo
    {

        public static AreaModelo _instancia = null;
        private AreaModelo()
        {

        }

        public static AreaModelo instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new AreaModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_AREA_Result> ListarArea()
        {
            List<SP_C_AREA_Result> listarCargo = new List<SP_C_AREA_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarCargo = db.SP_C_AREA().ToList();
                    return listarCargo;
                }
                catch (Exception ex)
                {
                    listarCargo = null;
                    return listarCargo;
                }

            }
        }
    }
}