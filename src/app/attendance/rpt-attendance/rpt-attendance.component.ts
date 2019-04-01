import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-rpt-attendance',
  templateUrl: './rpt-attendance.component.html',
  styleUrls: ['./rpt-attendance.component.css']
})
export class RptAttendanceComponent implements OnInit {

  public section: String; 

  constructor() { }

  ngOnInit() {
    this.section = "CONSULTA DE ASISTENCIAS";
    $('select').selectpicker();
  }

}