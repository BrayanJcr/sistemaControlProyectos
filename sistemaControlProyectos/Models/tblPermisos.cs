//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace sistemaControlProyectos.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblPermisos
    {
        public int IDPermiso { get; set; }
        public int IDCargo { get; set; }
        public Nullable<int> IDSubMenu { get; set; }
        public Nullable<bool> Activo { get; set; }
        public bool Edicion { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
    
        public virtual tblCargo tblCargo { get; set; }
        public virtual tblSubMenu tblSubMenu { get; set; }
    }
}
