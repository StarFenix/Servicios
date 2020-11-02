import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public UsuarioInyectado: UsuarioService) { }

  ngOnInit() {
    /* console.log(this.UsuarioInyectado.usuario.nombre) */
  }

  cambiarNombre(){
    this.UsuarioInyectado.usuario.nombre = "Ilse"
  }

}
