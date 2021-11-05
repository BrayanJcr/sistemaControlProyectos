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

        public static CargoModelo Instancia
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
        public bool RegistrarCargo(tblCargo objeto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {
                    try
                    {
                        db.SP_A_CARGO(objeto.nomCargo);

                        db.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;

                    }
                }
            }
            catch
            {
                respuesta = false;

            }

            return respuesta;
        }

        public bool EliminarCargo(int IDCargo)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_CARGO(IDCargo);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarCargo(tblCargo objeto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_CARGO(objeto.IDCargo, objeto.nomCargo);
                        db.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;

                    }

                }
            }
            catch
            {
                respuesta = false;

            }

            return respuesta;
        }

    }
}