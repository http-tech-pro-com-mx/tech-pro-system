import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Personal } from '../models/personal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(usuarios: Array<Usuario>, searchText: string): Array<Usuario> {
    if (!usuarios) return [];
    if (!searchText) return usuarios;

    searchText = searchText.toUpperCase();
    
    return usuarios.filter(usuario => {
      let personal: Personal =  usuario.personal;
      return personal.nombre.includes(searchText) || personal.apellido_paterno.includes(searchText);
    });

  }

}
