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
    
    public partial class SP_C_PROFESIONAL_Result
    {
        public int IDProfesional { get; set; }
        public string DNI { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
        public int IDCargo { get; set; }
        public string nomCargo { get; set; }
        public string contraseña { get; set; }
        public Nullable<int> firma { get; set; }
        public string profesion { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public Nullable<int> IDProyectoActual { get; set; }
    }
}
