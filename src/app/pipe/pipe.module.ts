import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { NombrePipe } from './nombre.pipe';

@NgModule({
  declarations: [SearchPipe, NombrePipe],
  imports: [
    CommonModule
  ],
  exports:[
    SearchPipe,
    NombrePipe
  ]
})
export class PipeModule { }
