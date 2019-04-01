export class Usuario {
    constructor(
        public id: number,
        public usuario: string,
        public contrasenia: string,
        public userid: number,
        //public Personal personal,
        //public List<Rol> roles,
        public estatus: boolean
    ) { }
}
