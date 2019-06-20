import { Quincena } from './quincena';
import { Justificacion } from './justificacion';

export class Diah{
    constructor(
        public id_dia_habil: number,
        public fecha: Date,
        public id_quincena: Quincena,
        public estatus: number,
        public id_usuario_registro?: number,
        public fecha_registro?: string,
        public id_usuario_modifica_registro?: number,
        public fecha_modifica_registro?: string,
        public justificaciones?: Array<Justificacion>
    ){}
}