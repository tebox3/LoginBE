import { Component, Input } from '@angular/core';
import { ShareService } from '../share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //Muestra el mensaje recibido desde el backend, si es el ingreso correcto o no
  mensaje='';
  constructor(
    private shareService: ShareService,
    private router: Router
  ) {
    this.shareService.mensaje$.subscribe((valor)=>{
      this.mensaje = valor;
    })
  }
  logout() {
    console.log("falta limpiar data");
    this.router.navigate(['']);
    sessionStorage.removeItem("login");
  }
  

}
