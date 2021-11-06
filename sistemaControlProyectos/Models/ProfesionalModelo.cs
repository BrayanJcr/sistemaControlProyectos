using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using sistemaControlProyectos.Models;
namespace sistemaControlProyectos.Models
{
    public class ProfesionalModelo
    {
        public static ProfesionalModelo _instancia = null;
        private ProfesionalModelo()
        {

        }

        public static ProfesionalModelo instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ProfesionalModelo();
                }
                return _instancia;
            }
        }
        public List<SP_C_PROFESIONAL_Result> ListarProfesional()
        {
            List<SP_C_PROFESIONAL_Result> listarProfesional = new List<SP_C_PROFESIONAL_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarProfesional = db.SP_C_PROFESIONAL().ToList();
                    return listarProfesional;
                }
                catch (Exception ex)
                {
                    listarProfesional = null;
                    return listarProfesional;
                }

            }
        }
       
        public bool RegistrarProfesional(tblProfesional profesional)
        {
            
            
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_A_PROFESIONAL(profesional.DNI,profesional.IDCargo,profesional.IDArea,profesional.IDReporte,profesional.IDProyectoActual);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                    
                }

            }
        }


        public bool EliminarProfesional(int profesional)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_PROFESIONAL(profesional);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public bool ModificarProfesional(tblProfesional profesional)
        {
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_PROFESIONAL(profesional.IDProfesional,profesional.DNI, profesional.IDCargo, profesional.IDArea, profesional.IDReporte,profesional.IDProyectoActual);
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
      

        public List<SP_C_PROFESIONAL_Result> ObtenerProfesional()
        {

            List<SP_C_PROFESIONAL_Result> login = new List<SP_C_PROFESIONAL_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    login = db.SP_C_PROFESIONAL().ToList();
                    return login;
                }
                catch (Exception ex)
                {
                    login = null;
                    return login;
                }
            }           
        }
    }
}