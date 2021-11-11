using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
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

        public tblProfesional DetalleProfesional(int id)
        {
            tblProfesional rptProfesional = new tblProfesional();
            

            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("SP_C_DETALLEUSUARIO", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@IDProfesional", id);
                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("usuario") != null)
                            {
                                rptProfesional = (from dato in doc.Elements("usuario")
                                                  select new tblProfesional()
                                                  {
                                                      IDProfesional=int.Parse(dato.Element("IDProfesional").Value),
                                                      DNI=dato.Element("DNI").Value,
                                                      IDCargo=int.Parse(dato.Element("IDCargo").Value),
                                                      IDArea=int.Parse(dato.Element("IDArea").Value),
                                                      IDProyectoActual=int.Parse(dato.Element("IDProyectoActual").Value)
                                                  }).FirstOrDefault();
                                rptProfesional.tblCargo = (from dato in doc.Element("usuario").Elements("DetalleCargo")
                                                         select new tblCargo()
                                                         {
                                                             nomCargo=dato.Element("nomCargo").Value
                                                         }).FirstOrDefault();
                                rptProfesional.OListaMenu = (from menu in doc.Element("usuario").Element("DetalleMenu").Elements("Menu")
                                                             select new tblMenu()
                                                             {

                                                                 NombreMenu=menu.Element("NombreMenu").Value,
                                                                 Icono=menu.Element("Icono").Value,
                                                                 tblSubMenu=(from submenu in menu.Element("DetalleSubMenu").Elements("SubMenu")
                                                                                select new tblSubMenu()
                                                                                {
                                                                                    NombreSubMenu=submenu.Element("NombreSubMenu").Value,
                                                                                    Vista=submenu.Element("Vista").Value,
                                                                                    Controlador=submenu.Element("Controlador").Value,
                                                                                    Activo=(submenu.Element("Activo").Value.ToString()== "1" ? true :false),
                                                                                }).ToList()
                                                             }).ToList();
                            }
                            else
                            {
                                rptProfesional = null;
                            }
                        }
                        dr.Close();
                    }
                    return rptProfesional;
                }
                catch (Exception ex)
                {
                    rptProfesional = null;
                    return rptProfesional;
                }
            }
        }
        public SP_C_PROFESIONALID_Result ListarProfesionalid(int idprofesional)
        {
            SP_C_PROFESIONALID_Result listarProfesional = new SP_C_PROFESIONALID_Result();
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    listarProfesional = db.SP_C_PROFESIONALID(idprofesional).FirstOrDefault();
                    return listarProfesional;
                }
                catch (Exception ex)
                {
                    listarProfesional = null;
                    return listarProfesional;
                }

            }
        }
    }
}