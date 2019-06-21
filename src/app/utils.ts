import { FormControl } from "@angular/forms";

function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

const dataTableConfigJSON = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Último",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

function validaTextNull(texto: string): string{
  return (!texto)?'':texto;
}

/**
 * @function getTablaUtf8
 * @param  {number} id -  Selector jquery de la tabla
 * @return  {string} 
 * @description funcion utilizada para quitar caracteres especiales cuando se exporta a excel
 */
function getTablaUtf8(id: string): string {
  let tabla = document.getElementById(id);
  return tabla.outerHTML.replace(/ /g, '%20')
      .replace(/á/g, '%e1')
      .replace(/Á/g, '%c1')
      .replace(/é/g, '%e9')
      .replace(/É/g, '%c9')
      .replace(/í/g, '%a1')
      .replace(/Í/g, '%ed')
      .replace(/ó/g, '%f3')
      .replace(/Ó/g, '%d3')
      .replace(/ú/g, '%fa')
      .replace(/Ú/g, '%da')
      .replace(/Ñ/g, '%d1')
      .replace(/ñ/g, '%f1')
      .replace(/´/g, '%27')
      .replace(/-/g, '%2d')
      .replace(/=/g, '%3d')
      .replace(/,/g, '%2c')
      .replace(/\//g, '%2f')
      .replace(/#/g, '%23');
}

/**
 * @function setCookie
 * @param  {string} name -  nombre de cookie
 * @param  {string} cvalue -  cvalue valor de la cookie
 * @param  {number} exdays -  tiempo de vida
 * @return  {void} 
 * @description funcion utilizada para almacenar  cookies
 */
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * @function getCookie
 * @param  {string} cname -  nombre de cookie
 * @return  {string} 
 * @description funcion utilizada para recuperar la cookie 
 */
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

/**
 * @function eraseCookie
 * @param  {string} cname -  nombre de cookie
 * @return  {void} 
 * @description funcion utilizada para eliminar la cookie 
 */
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=0'
}

export{
    noWhitespaceValidator,
    dataTableConfigJSON,
    validaTextNull,
    getTablaUtf8,
    setCookie,
    getCookie,
    eraseCookie
}