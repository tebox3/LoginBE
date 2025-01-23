import { Component, OnInit } from '@angular/core';
import {signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';
import forge from 'node-forge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  title = 'loginAngular';
  session = false;
  key: any;
  newpass: any;
  //Declara las variables para almacenar nickname y pass que ingrese el usuario
  userName = signal<string>("");
  userPass = signal<string>("");
  
  constructor(private http: HttpClient, private shareService: ShareService, private router: Router){}

  encryptData(data: string, publicKey: string): string {
    //Encripta los datos con la clave publica entregada por el backend
    const rsa = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = rsa.encrypt(data, 'RSA-OAEP'); // Usa OAEP
    return forge.util.encode64(encrypted);
  }

  //Funcion llamada al hacer click en ingresar  
  updateInput(name: string,pass: string) {
    //Les da el valor dado por el usuario
    this.userName.set(name);
    //encripta la contraseña con la clave publica
    this.newpass = this.encryptData(pass, this.key.publicKey);
    this.userPass.set(pass);
    //Hace la consulta a la API para revisar si son correctas
    this.http.post<any>('http://localhost:3000/User/login', {
    "nickname": this.userName(),
    "pass":this.newpass}).subscribe(data => {
      //Entrega respuesta en el componente home, mostrando el mensaje recibido en pantalla
      this.shareService.setMensaje(data.message);
      console.log(data.session);
      if(data.session === true){
        console.log(1);
        this.router.navigate(['/home']);
        sessionStorage.setItem("login", "true");
      }else{
        this.session=true;
      }
    })
  }

  ngOnInit() {
    sessionStorage.setItem("login", "false");
    const url = 'http://localhost:3000/User/public-key'; 
    this.http.get(url).subscribe(
      respuesta => {
        this.key = respuesta;
      },
      (error) => {
        console.log('Error al realizar la consulta:', error);
      }
    );
  }
}
