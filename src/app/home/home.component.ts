import { Component, Input } from '@angular/core';
import { ShareService } from '../share.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mensaje='';
  constructor(private shareService: ShareService) {
    this.shareService.mensaje$.subscribe((valor)=>{
      this.mensaje = valor;
    })
  }

}
