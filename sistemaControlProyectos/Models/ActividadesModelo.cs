using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class ActividadesModelo
    {
        public static ActividadesModelo _instancia = null;

        private ActividadesModelo()
        {

        }
        public static ActividadesModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ActividadesModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_ACTIVIDAD_Result> ListarActividad()
        {
            List<SP_C_ACTIVIDAD_Result> listarActividad = new List<SP_C_ACTIVIDAD_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            try{
                listarActividad = db.SP_C_ACTIVIDAD().ToList();

                return listarActividad;

            }
                catch (Exception ex)
            {
                    listarActividad = null;
                return listarActividad;
            }
        }

        public bool RegistrarActividad(tblActividad objetoActividad)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_ACTIVIDAD(objetoActividad.titActividad, objetoActividad.fechaInicio, 
                            objetoActividad.fechaFin, objetoActividad.Descripcion, 
                            objetoActividad.estado, objetoActividad.creador,objetoActividad.proceso,
                            objetoActividad.IDProyecto);
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

        public bool EliminarActividad(int iDActividad)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_ACTIVIDAD(iDActividad);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarActividad(tblActividad objetoActividad)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_ACTIVIDAD(objetoActividad.IDActividad, objetoActividad.titActividad, objetoActividad.fechaInicio,
                            objetoActividad.fechaFin, objetoActividad.Descripcion,
                            objetoActividad.estado, objetoActividad.creador, objetoActividad.proceso,
                            objetoActividad.IDProyecto);
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
