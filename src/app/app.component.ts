import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>LOGIN</h1>
    <input
    type="text"
    placeholder="usuario"
    #inputUser
    style="padding: 5px; font-size: 16px;"
    />
    <br>
    <br>
    <input
    type="text"
    placeholder="contraseña"
    #inputPass
    style="padding: 5px; font-size: 16px;"/>
    <br>
    <br>
   <button
    (click)="updateInput(inputUser.value, inputPass.value)"
    style="padding: 5px 10px; font-size: 16px;"
    >
    Ingresar
    </button>

  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'loginAngular';
  //Declara las variables para almacenar nick y pass que ingrese el usuario
  userName = signal<string>("");
  userPass = signal<string>("");
  constructor(private http: HttpClient){}
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
      console.log("RESPUESTA: ", data.message)
    })
  }
}
