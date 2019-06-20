import { Diah } from './diah';
import { Personal } from './personal';

export class Justificacion{
    constructor(
        public id_justificacion: number,
        public motivo:string,
        public descripcion: string,
        public id_estatus: number,
        public dias: Array<Diah>,
        public id_personal: Personal,
        public id_personal_autoriza?: Personal,
        public id_usuario_registro?: number,
        public fecha_registro?: string,
        public id_usuario_modifica_registro?: number,
        public fecha_modifica_registro?: string
    ){}
}