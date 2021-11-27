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

        public List<SP_C_ACTIVIDADPROFENCAR_Result> ListarActividadEncar(int IDProfesional)
        {
            List<SP_C_ACTIVIDADPROFENCAR_Result> listarActividad = new List<SP_C_ACTIVIDADPROFENCAR_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarActividad = db.SP_C_ACTIVIDADPROFENCAR(IDProfesional).ToList();

                    return listarActividad;

                }
                catch (Exception ex)
                {
                    listarActividad = null;
                    return listarActividad;
                }
        }

        public bool ModificarProceso(int IDActividad,string Proceso)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    db.SP_M_ACTIVIDADPROCESO(IDActividad, Proceso);
                    db.SaveChanges();

                    return true;

                }
                catch (Exception ex)
                {
                    return false;
                }
        }

        public bool RegistrarActividad(tblActividad objetoActividad, int IDProyecto)
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
                            IDProyecto);
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
        public bool ModificarActividad(tblActividad objetoActividad, int IDProyecto)
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
                            IDProyecto);
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

        //AsignarResponsable a Actividad

        public List<SP_C_ProfesionalActividad_Result> ListarActividadResponsable()
        {
            List<SP_C_ProfesionalActividad_Result> listarActividadResponsable = new List<SP_C_ProfesionalActividad_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarActividadResponsable = db.SP_C_ProfesionalActividad().ToList();

                    return listarActividadResponsable;

                }
                catch (Exception ex)
                {
                    listarActividadResponsable = null;
                    return listarActividadResponsable;
                }
        }

        public bool RegistrarActividadResponsable(tblProfesional_Actividad objetoActividadRes)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_ProfesionalActividad(objetoActividadRes.IDActividad,objetoActividadRes.IDProfesional);
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

        public bool EliminarAsigResponsa(int IDProfActividad)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_ProfesionalActividad(IDProfActividad);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }

        //Asignar Recurso a Actividad

        public List<SP_C_RECURSO_ACTIVIDAD_Result> ListarActividadRescurso()
        {
            List<SP_C_RECURSO_ACTIVIDAD_Result> listarActividadRecurso = new List<SP_C_RECURSO_ACTIVIDAD_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarActividadRecurso = db.SP_C_RECURSO_ACTIVIDAD().ToList();

                    return listarActividadRecurso;

                }
                catch (Exception ex)
                {
                    listarActividadRecurso = null;
                    return listarActividadRecurso;
                }
        }

        public bool RegistrarActividadRecurso(tblRecurso_Actividad objetoActividadRec)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_RECURSO_ACTIVIDAD( objetoActividadRec.IDRecurso, objetoActividadRec.IDActividad, objetoActividadRec.cantidad);
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

        public bool EliminarAsigRecurso(int IDRecActividad)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_RECURSO_ACTIVIDAD(IDRecActividad);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
    }

}
