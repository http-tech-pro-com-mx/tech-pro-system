import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-form-justification',
  templateUrl: './form-justification.component.html',
  styleUrls: ['./form-justification.component.css']
})
export class FormJustificationComponent implements OnInit {

  public section:string;
  constructor() { }

  ngOnInit() {
    this.section = "JUSTIFICACIÓN";

    $('.calendario').datepicker({
      multidate: true,
      format: 'mm/dd/yyyy',
      language: 'es'
    });

  }

}
