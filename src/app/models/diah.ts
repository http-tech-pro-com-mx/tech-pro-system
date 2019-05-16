import { Quincena } from './quincena';

export class Diah{
    constructor(
        public id_dia_habil: number,
        public fecha: Date,
        public id_quincena: Quincena,
        public id_usuario_regitro?: number,
        public fecha_regitro?: string,
        public id_usuario_modifica_registro?: number,
        public fecha_modifica_registro?: string
    ){}
}