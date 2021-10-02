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

        public List<SP_C_PROFESIONALRESPONSABLE_Result> ListarProfesional()
        {
            List<SP_C_PROFESIONALRESPONSABLE_Result> listarProfesional = new List<SP_C_PROFESIONALRESPONSABLE_Result>();
            using (DBControlProyectoEntities db=new DBControlProyectoEntities())
            {

                try
                {
                    listarProfesional = db.SP_C_PROFESIONALRESPONSABLE().ToList();
                    return listarProfesional;
                }catch(Exception ex)
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
                    db.SP_A_PROFESIONAL(profesional.DNI,profesional.IDCargo,profesional.IDArea,profesional.IDReporte);
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
                        db.SP_M_PROFESIONAL(profesional.DNI, profesional.IDCargo, profesional.IDArea, profesional.IDReporte);
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
      

        public List<SP_C_PROFESIONALLOGIN_Result> ObtenerProfesional(string user,string pass)
        {

            List<SP_C_PROFESIONALLOGIN_Result> login = new List<SP_C_PROFESIONALLOGIN_Result>();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    login = db.SP_C_PROFESIONALLOGIN(user, pass).ToList();
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