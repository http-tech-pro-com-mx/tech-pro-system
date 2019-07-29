import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    PreloaderComponent,
    ChatComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PreloaderComponent,
    ChatComponent
  ]
})
export class SharedModule { }
