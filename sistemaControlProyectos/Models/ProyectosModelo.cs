using System;
using System.Collections.Generic;
using System.Linq;

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

        public List<SP_C_PROYECTOLISTA_Result> ListarTabla()
        {
            List<SP_C_PROYECTOLISTA_Result> lista = new List<SP_C_PROYECTOLISTA_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    lista = db.SP_C_PROYECTOLISTA().ToList();

                    return lista;

                }
                catch (Exception ex)
                {
                    lista = null;
                    return lista;
                }
        }

        public bool RegistrarProyecto(tblProyecto objetoProyecto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_PROYECTO(objetoProyecto.titProyecto,objetoProyecto.fechaIniPro,
                            objetoProyecto.fechaFinPro,objetoProyecto.descripcion,objetoProyecto.estado,
                            objetoProyecto.Ubicacion,objetoProyecto.distrito,objetoProyecto.departamento,
                            objetoProyecto.imagen,objetoProyecto.seguimiento,objetoProyecto.IDProfesional);
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

        public bool EliminarProyecto(int idProyecto)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_PROYECTO(idProyecto);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarProyecto(tblProyecto objetoProyecto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_PROYECTO(objetoProyecto.IDProyecto,objetoProyecto.titProyecto, objetoProyecto.fechaIniPro,
                            objetoProyecto.fechaFinPro, objetoProyecto.descripcion, objetoProyecto.estado,
                            objetoProyecto.Ubicacion, objetoProyecto.distrito, objetoProyecto.departamento,
                            objetoProyecto.imagen, objetoProyecto.seguimiento, objetoProyecto.IDProfesional);
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

        //Asignar Profesional a Proyecto

        public List<SP_C_PROYECTOPROFESIONAL_Result> ListarProyectoProfesional()
        {
            List<SP_C_PROYECTOPROFESIONAL_Result> listarProyectoProfesional = new List<SP_C_PROYECTOPROFESIONAL_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarProyectoProfesional = db.SP_C_PROYECTOPROFESIONAL().ToList();

                    return listarProyectoProfesional;

                }
                catch (Exception ex)
                {
                    listarProyectoProfesional = null;
                    return listarProyectoProfesional;
                }
        }

        public bool RegistrarProyectoProfesional(tblProfesional_Proyecto objeto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_PROYECTOPROFESIONAL(objeto.IDProfesional, objeto.IDProyecto);
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

        public bool EliminarAsigProfesional(int IDProfeProyecto)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_PROYECTOPROFESIONAL(IDProfeProyecto);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }

        public List<SP_C_PROYECTOPROFESIONAL_Result> ListarProyectoProfesional()
        {
            List<SP_C_PROYECTOPROFESIONAL_Result> listarProyectoProfesional = new List<SP_C_PROYECTOPROFESIONAL_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarProyectoProfesional = db.SP_C_PROYECTOPROFESIONAL().ToList();

                    return listarProyectoProfesional;

                }
                catch (Exception ex)
                {
                    listarProyectoProfesional = null;
                    return listarProyectoProfesional;
                }
        }

        public List<SP_C_PROYECTOPROFESIONALIMAGEN_Result> ListarProyectoProfesionalImagen(int IDProfesional)
        {
            List<SP_C_PROYECTOPROFESIONALIMAGEN_Result> listarProyectoProfesional = new List<SP_C_PROYECTOPROFESIONALIMAGEN_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarProyectoProfesional = db.SP_C_PROYECTOPROFESIONALIMAGEN(IDProfesional).ToList();

                    return listarProyectoProfesional;

                }
                catch (Exception ex)
                {
                    listarProyectoProfesional = null;
                    return listarProyectoProfesional;
                }
        }

    }
}