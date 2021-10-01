using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class ObtenerUsuario
    {
        public static ObtenerUsuario _instancia = null;
        private ObtenerUsuario()
        {

        }

        public static ObtenerUsuario instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new ObtenerUsuario();
                }
                return _instancia;
            }
        }

        public SP_C_USUARIODNI_Result ListarUsuarioid(string dni)
        {
            
            using (DBControlProyectoEntities db = new DBControlProyectoEntities())
            {
                SP_C_USUARIODNI_Result listarUsuario = new SP_C_USUARIODNI_Result();
                try
                {
                    listarUsuario = db.SP_C_USUARIODNI(dni).FirstOrDefault();
                    return listarUsuario;
                }
                catch (Exception ex)
                {
                    listarUsuario = null;
                    return listarUsuario;
                }

            }
        }
    }
}