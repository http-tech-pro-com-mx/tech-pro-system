import { Component, OnInit } from '@angular/core';

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
  }

}
