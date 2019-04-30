import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-rpt-attendance-admin',
  templateUrl: './rpt-attendance-admin.component.html',
  styleUrls: ['./rpt-attendance-admin.component.css']
})
export class RptAttendanceAdminComponent implements OnInit {

  public section: String;

  constructor() { }

  ngOnInit() {
    this.section = "REPORTE ADMINISTRADOR";
    $('select').selectpicker();
  }

}
