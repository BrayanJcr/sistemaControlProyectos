using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class RecursoModelo
    {
        public static RecursoModelo _instancia = null;
        private RecursoModelo()
        {

        }

        public static RecursoModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new RecursoModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_RECURSO_Result> ListarRecurso()
        {
            List<SP_C_RECURSO_Result> listar = new List<SP_C_RECURSO_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listar = db.SP_C_RECURSO().ToList();
                    return listar;
                }
                catch (Exception ex)
                {
                    listar = null;
                    return listar;
                }

            }
        }

        public bool RegistrarRecurso(tblRecurso objeto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {
                    try
                    {
                        db.SP_A_RECURSO(objeto.nomRecurso, objeto.cantidadStock, objeto.costo);

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

        public bool EliminarRecurso(int IDRecurso)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_RECURSO(IDRecurso);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarRecurso(tblRecurso objeto)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_RECURSO(objeto.IDRecurso, objeto.nomRecurso
                            , objeto.cantidadStock, objeto.costo
                            );
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