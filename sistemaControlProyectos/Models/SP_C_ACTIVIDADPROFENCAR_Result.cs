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
    
<<<<<<< HEAD:sistemaControlProyectos/Models/SP_C_ACTAS_Result.cs
    public partial class SP_C_ACTAS_Result
    {
        public string DescripcionActas { get; set; }
        public Nullable<System.DateTime> FechaCreacion { get; set; }
        public string titProyecto { get; set; }
        public string DNI { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
=======
    public partial class SP_C_ACTIVIDADPROFENCAR_Result
    {
        public int IDActividad { get; set; }
        public string titActividad { get; set; }
        public System.DateTime fechaInicio { get; set; }
        public System.DateTime fechaFin { get; set; }
        public string Descripcion { get; set; }
        public bool estado { get; set; }
        public string creador { get; set; }
        public string proceso { get; set; }
        public int IDProyecto { get; set; }
>>>>>>> 71ad468e7ab85d262dea2b4c4e001276397a431e:sistemaControlProyectos/Models/SP_C_ACTIVIDADPROFENCAR_Result.cs
    }
}
