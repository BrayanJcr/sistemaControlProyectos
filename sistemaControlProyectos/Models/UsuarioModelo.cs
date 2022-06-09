using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class UsuarioModelo
    {
        public static UsuarioModelo _instancia = null;
        private UsuarioModelo()
        {

        }

        public static UsuarioModelo instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new UsuarioModelo();
                }
                return _instancia;
            }
        }

        public List<SP_C_USUARIO_Result> ListarUsuario()
        {        
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                List<SP_C_USUARIO_Result> listarProfesional = new List<SP_C_USUARIO_Result>();
                try
                {
                    listarProfesional = db.SP_C_USUARIO().ToList();
                    return listarProfesional;
                }
                catch (Exception ex)
                {
                    listarProfesional = null;
                    return listarProfesional;
                }

            }
        }
        public bool RegistrarUsuario(tblUsuario usuario,String documento)
        {
            string codigo = Base64Encode(documento);

            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_A_USUARIO(usuario.DNI, usuario.nombre, usuario.apellidos, usuario.contraseña,usuario.profesion,usuario.correo,usuario.telefono,usuario.usrImagen,documento,codigo);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }

        public static string Base64Encode(string plainText)
        {
            return System.Web.Helpers.Crypto.Hash(plainText);
        }

        public bool ModificarProfesional(tblUsuario usuario,string Documento)
        {
            string codigo = null;
            bool respuesta = true;
            try
            {
                using (DBControlProyectoEntities db = new DBControlProyectoEntities())
                {

                    try
                    {
                        db.SP_M_USUARIO(usuario.DNI, usuario.nombre, usuario.apellidos, usuario.contraseña, usuario.profesion, usuario.correo, usuario.telefono, usuario.usrImagen, Documento, codigo);
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
        public bool EliminarUsuario(string DNI)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {

                try
                {
                    db.SP_E_USUARIO(DNI);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;

                }

            }
        }
        public List<SP_C_PROFESIONALIMAGENUSUARIO_Result> ListarUsuarioImagen(String DNI)
        {
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                List<SP_C_PROFESIONALIMAGENUSUARIO_Result> listarProfesional = new List<SP_C_PROFESIONALIMAGENUSUARIO_Result>();
                try
                {
                    listarProfesional = db.SP_C_PROFESIONALIMAGENUSUARIO(DNI).ToList();
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