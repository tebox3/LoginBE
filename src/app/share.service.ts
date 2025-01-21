import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private mensaje = new BehaviorSubject<string>('');
  mensaje$ = this.mensaje.asObservable();

  setMensaje(value: string){
    this.mensaje.next(value);
  }
}
