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
    
    public partial class tblProfesional
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblProfesional()
        {
            this.tblArea = new HashSet<tblArea>();
            this.tblCuadernoProfesional = new HashSet<tblCuadernoProfesional>();
            this.tblProfesional_Proyecto = new HashSet<tblProfesional_Proyecto>();
            this.tblProfesional_Reunion = new HashSet<tblProfesional_Reunion>();
            this.tblProfesional_Actividad = new HashSet<tblProfesional_Actividad>();
            this.tblProyecto = new HashSet<tblProyecto>();
            this.tblReporte = new HashSet<tblReporte>();
            this.tblReunion = new HashSet<tblReunion>();
        }
    
        public int IDProfesional { get; set; }
        public string DNI { get; set; }
        public int IDCargo { get; set; }
        public Nullable<int> IDProyectoActual { get; set; }
        public List<tblMenu> OListaMenu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblArea> tblArea { get; set; }
        public virtual tblCargo tblCargo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCuadernoProfesional> tblCuadernoProfesional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblProfesional_Proyecto> tblProfesional_Proyecto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblProfesional_Reunion> tblProfesional_Reunion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblProfesional_Actividad> tblProfesional_Actividad { get; set; }
        public virtual tblUsuario tblUsuario { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblProyecto> tblProyecto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblReporte> tblReporte { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblReunion> tblReunion { get; set; }
    }
}
