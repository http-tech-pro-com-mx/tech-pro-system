import { Personal } from './personal';

export class Usuario {
    constructor(
        public id: number,
        public usuario: string,
        public contrasenia: string,
        public userid: number,
        public estatus: boolean,
        public personal?: Personal,
        //public List<Rol> roles,
    ) { }
}
