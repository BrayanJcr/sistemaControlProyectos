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
    
    public partial class SP_C_RECURSO_ACTIVIDAD_Result
    {
        public int idRecursoActividad { get; set; }
        public int IDRecurso { get; set; }
        public string nomRecurso { get; set; }
        public int cantidadStock { get; set; }
        public decimal costo { get; set; }
        public int IDActividad { get; set; }
        public string titActividad { get; set; }
        public System.DateTime fechaInicio { get; set; }
        public System.DateTime fechaFin { get; set; }
        public string Descripcion { get; set; }
        public bool estado { get; set; }
        public string creador { get; set; }
        public string proceso { get; set; }
        public int IDProyecto { get; set; }
        public int cantidad { get; set; }
    }
}
