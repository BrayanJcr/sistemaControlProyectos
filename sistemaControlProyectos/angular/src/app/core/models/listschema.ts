import { Actividad } from './Actividad';

export interface ListSchema {
    id: string;
    name: string;
    tasks: Actividad[];
}
