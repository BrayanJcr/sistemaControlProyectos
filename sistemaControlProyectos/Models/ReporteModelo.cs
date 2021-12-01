using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class ReporteModelo
    {
        public static ReporteModelo _instancia = null;

        private ReporteModelo()
        {

        }
        public static ReporteModelo Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ReporteModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_REPORTE_Result> ListarReporte(int IDProyecto)
        {
            List<SP_C_REPORTE_Result> listarReporte = new List<SP_C_REPORTE_Result>();

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                try
                {
                    listarReporte = db.SP_C_REPORTE(IDProyecto).ToList();

                    return listarReporte;

                }
                catch (Exception ex)
                {
                    listarReporte = null;
                    return listarReporte;
                }
        }
        public bool EliminarReporte(int iDReporte)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_Reporte(iDReporte);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool RegistrarReporte(tblReporte objeto, string detalle, int IDProfesional)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_A_REPORTE(objeto.FechaRep, objeto.Descripcion, null, IDProfesional, detalle);
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

        public bool ModificarReporte(tblReporte objetoReporte)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_REPORTE(objetoReporte.IDReport, objetoReporte.FechaRep, objetoReporte.Descripcion,
                            objetoReporte.Estado.ToString(), objetoReporte.IDDoc,
                            objetoReporte.IDProfesional);
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