using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class CargoModelo
    {
        public static CargoModelo _instancia = null;
        private CargoModelo()
        {

        }

        public static CargoModelo instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CargoModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_CARGO_Result> ListarCargo()
        {
            List<SP_C_CARGO_Result> listarCargo = new List<SP_C_CARGO_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarCargo = db.SP_C_CARGO().ToList();
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