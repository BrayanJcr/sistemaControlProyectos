using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}