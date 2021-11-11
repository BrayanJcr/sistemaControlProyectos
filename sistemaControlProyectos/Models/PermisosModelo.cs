using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class PermisosModelo
    {
        public static PermisosModelo _instancia = null;
        private PermisosModelo()
        {

        }
        public static PermisosModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new PermisosModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_PERMISOS_Result> ListarPermisos(int IDCargo)
        {
            List<SP_C_PERMISOS_Result> listarPermiso = new List<SP_C_PERMISOS_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarPermiso = db.SP_C_PERMISOS(IDCargo).ToList();
                    return listarPermiso;
                }
                catch (Exception ex)
                {
                    listarPermiso = null;
                    return listarPermiso;
                }

            }
        }

        public bool ModificarPermiso(string Detalle)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_ActualizarPermisos(Detalle);
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