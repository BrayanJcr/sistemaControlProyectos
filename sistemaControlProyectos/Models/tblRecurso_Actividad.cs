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
    
    public partial class tblRecurso_Actividad
    {
        public int idRecursoActividad { get; set; }
        public int IDRecurso { get; set; }
        public int IDActividad { get; set; }
        public int cantidad { get; set; }
    
        public virtual tblActividad tblActividad { get; set; }
        public virtual tblRecurso tblRecurso { get; set; }
    }
}
