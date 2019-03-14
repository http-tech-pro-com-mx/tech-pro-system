import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-attendance',
  templateUrl: './conf-attendance.component.html',
  styleUrls: ['./conf-attendance.component.css']
})
export class ConfAttendanceComponent implements OnInit {

  public section:string;

  constructor() { }

  ngOnInit() {
    this.section = "CONFIGURACIÓN";
  }

}
