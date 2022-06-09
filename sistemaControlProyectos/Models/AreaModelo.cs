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

        public static AreaModelo Instancia
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
        public List<SP_O_AREA_Result> ObtenerArea(int IDArea)
        {
            List<SP_O_AREA_Result> listarArea = new List<SP_O_AREA_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarArea = db.SP_O_AREA(IDArea).ToList();
                    return listarArea;
                }
                catch (Exception ex)
                {
                    return listarArea;

                }

            }
        }

        public List<SP_C_HIJOS_Result> ListarHijos(int IDArea)
        {
            List<SP_C_HIJOS_Result> listarArea = new List<SP_C_HIJOS_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarArea = db.SP_C_HIJOS(IDArea).ToList();
                    return listarArea;
                }
                catch (Exception)
                {
                    return listarArea;

                }
            }
        }
        public List<SP_C_AREAINICIO_Result> ConsultarInicio()
        {
            List<SP_C_AREAINICIO_Result> listarArea;
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarArea = db.SP_C_AREAINICIO().ToList();
                    return listarArea;
                }
                catch (Exception ex)
                {
                    listarArea = null;
                    return listarArea;
                }

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
        public List<SP_C_AREAPADRE_Result> ListarAreaPadre()
        {
            List<SP_C_AREAPADRE_Result> listarArea = new List<SP_C_AREAPADRE_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarArea = db.SP_C_AREAPADRE().ToList();
                    return listarArea;
                }
                catch (Exception ex)
                {
                    listarArea = null;
                    return listarArea;
                }

            }
        }

        public bool RegistrarArea(tblArea objetoArea)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_AREA(objetoArea.IdNomAreaPadre,objetoArea.nomArea,objetoArea.IDProfesional,objetoArea.IDProyecto);

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

        public bool EliminarArea(int IDArea)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_AREA(IDArea);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarArea(tblArea objetoArea)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_AREA(objetoArea.IDArea,objetoArea.IdNomAreaPadre
                            ,objetoArea.nomArea,objetoArea.IDProfesional,objetoArea.IDProyecto
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