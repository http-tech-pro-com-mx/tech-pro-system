import { Pipe, PipeTransform } from '@angular/core';
import { Personal } from '../models/personal';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(personal: Personal, id_personal_session: number): string {
    if (personal == null) {
      return "";
    } else if(personal.id_personal == id_personal_session){
      return "YO";
    } else{
      return personal.nombre +" "+personal.apellido_paterno;
    }

  }

}
