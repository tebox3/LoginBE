import { Component } from '@angular/core';
import {signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'loginAngular';
  mensaje: string = 'Hola desde el padre';
  //Declara las variables para almacenar nick y pass que ingrese el usuario
  userName = signal<string>("");
  userPass = signal<string>("");
  constructor(private http: HttpClient, private shareService: ShareService){}
  updateInput(name: string,pass: string) {
    //Les da el valor dado por el usuario
    this.userName.set(name);
    this.userPass.set(pass);
    console.log(this.userName());
    console.log(this.userPass());
    //Hace la consulta a la API para revisar si son correctas
    //OJO, se envia la pass raw, hay que enviarla encriptada con llaves publica y privadas
    this.http.post<any>('http://localhost:3000/User/login', {
    "nickname": this.userName(),
    "pass":this.userPass()}).subscribe(data => {
      //Entrega respuesta en consola
      this.shareService.setMensaje(data.message);
      console.log("RESPUESTA: ", data.message)
    })
  }
}
