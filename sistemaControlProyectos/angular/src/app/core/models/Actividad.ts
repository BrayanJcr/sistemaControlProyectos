export interface Actividad {
  IDActividad: number;
  titActividad: string;
  Descripcion: string;
  Estado: boolean;
  creador: string;
  proceso: string;
  FechaInicio: Date | string;
  FechaFin: Date;
  IDProyecto: number;
}
