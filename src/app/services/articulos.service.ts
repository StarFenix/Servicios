import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  articulo: Articulo = new Articulo()
  ruta: string = 'http://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }


  leerNoticias() : Observable<Articulo[]>
  {
    //realiza una petición tipo get y devuelve un array de Artículo
    return this.http.get<Articulo[]>(this.ruta + 'posts')
  }

  leerUsuario(userId: number) : Observable<User>{
    return this.http.get<User>(this.ruta + 'users/' + userId)
  }

  leerTodosLosUsuarios() : Observable<User[]>{
    return this.http.get<User[]>(this.ruta + 'users/')
  }

  guardarArticulo(articulo: Articulo) : Observable<Articulo>{
    return this.http.post<Articulo>(this.ruta + 'posts', articulo)
  }
}
