import { Area } from './area';
import { Perfil } from './perfil';

export class Personal {
    constructor(
        public id_personal: number,
        public nombre: String,
        public apellido_paterno:string,
        public apellido_materno:string,
        public genero: number,
        public nombre_foto: string,
        public correo_electronico: string,
        public area?: Area,
        public perfil?: Perfil, 
        public jefe_directo?: number
    ){}
}
