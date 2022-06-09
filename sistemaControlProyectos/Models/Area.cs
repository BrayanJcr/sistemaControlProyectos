using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sistemaControlProyectos.Models
{
    public class Area
    {
        public int id { get; set; }
        public string puesto { get; set; }
        public string nombre { get; set; }
        public Area[] hijos { get; set; }

    }
}