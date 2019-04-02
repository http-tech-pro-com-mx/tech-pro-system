export class Personal {
    constructor(
        public id_personal: number,
        public nombre: String,
        public apellido_paterno:string,
        public apellido_materno:string,
        public genero: number,
        public correo_electronico: string,
        public id_area: number,
        public id_perfil: number, 
        public jefe_directo?: number
    ){}
}
