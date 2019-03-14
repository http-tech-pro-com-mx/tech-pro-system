import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-outstanding-justication',
  templateUrl: './outstanding-justication.component.html',
  styleUrls: ['./outstanding-justication.component.css']
})
export class OutstandingJusticationComponent implements OnInit {

  public section: String; 

  constructor() { }

  ngOnInit() {
    this.section = "JUSTIFICACIONES PENDIENTES";
  }

}
