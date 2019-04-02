import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public section: String;

  constructor() { }

  ngOnInit() {
    this.section = "MI PERFIL";
    setTimeout(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();
      
      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
    }, 150);
  }

}
