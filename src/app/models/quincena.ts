import { Mes } from './mes';
import { Anio } from './anio';

export class Quincena{
    constructor(
        public id_quincena: number,
        public id_mes: Mes,
        public id_anio: Anio,
        public numero_quincena: number,
        public hora_entrada: string,
        public hora_salida_comida: string,
        public hora_entrada_comida: string, 
        public hora_salida: string, 
        public activo: number
    ){}
}