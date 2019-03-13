import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-rpt-justification',
  templateUrl: './rpt-justification.component.html',
  styleUrls: ['./rpt-justification.component.css']
})
export class RptJustificationComponent implements OnInit {
  
  public section: String; 

  constructor() { }

  ngOnInit() {
    this.section = "CONSULTA DE JUSTIFICACIONES";
    $('select').selectpicker();
  }

}
