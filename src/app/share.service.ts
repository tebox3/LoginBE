import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private mensaje = new BehaviorSubject<string>('');
  private logeado = new BehaviorSubject<boolean>(false);
  mensaje$ = this.mensaje.asObservable();
  logeado$ = this.logeado.asObservable();

  setMensaje(value: string){
    this.mensaje.next(value);
  }

  setLogeado(value: boolean){
    this.logeado.next(value);
  }

  getLogeado(){
    return this.logeado;
  }
}
