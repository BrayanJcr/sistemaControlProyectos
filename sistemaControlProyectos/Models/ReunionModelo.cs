using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class ReunionModelo
    {
        public static ReunionModelo _instancia = null;

        private ReunionModelo()
        {

        }
        public static ReunionModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ReunionModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_REUNION_Result> ListarReunion()
        {
            List<SP_C_REUNION_Result> listarReunion = new List<SP_C_REUNION_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarReunion = db.SP_C_REUNION().ToList();

                    return listarReunion;

                }
                catch (Exception ex)
                {
                    listarReunion = null;
                    return listarReunion;
                }
        }
        public bool RegistrarProfesionalReunion(tblProfesional_Reunion objetoActividadRes)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_ProfesionalReunion(objetoActividadRes.IDProfesional,objetoActividadRes.IDReunion);
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
        public bool RegistrarReunion(tblReunion objetoReunion)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_REUNION( objetoReunion.tipoDeReunion, 
                            objetoReunion.fecha,
                            objetoReunion.ubicacion,
                            objetoReunion.tema, 
                            objetoReunion.estado,
                            objetoReunion.IDProyecto,
                            objetoReunion.IDProfesional);
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

        public bool EliminarReunion(int IDReunion)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_REUNION(IDReunion);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarReunion(tblReunion objetoReunion)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_REUNION(objetoReunion.IDReunion, objetoReunion.tipoDeReunion, objetoReunion.fecha,
                            objetoReunion.ubicacion, objetoReunion.tema,
                            objetoReunion.estado,
                            objetoReunion.IDProyecto,objetoReunion.IDProfesional);
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