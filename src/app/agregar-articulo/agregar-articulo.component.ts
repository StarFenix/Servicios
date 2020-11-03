import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../models/articulo';
import { User } from '../models/user';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent implements OnInit {
  usuarios: Array<User> = new Array<User>();
  formularioArticulo: FormGroup;
  esNuevo: boolean = true;
  titulo: string = '';
  articulo: Articulo = new Articulo();
  constructor(private ArticuloInyectado: ArticulosService, private fbGenerator: FormBuilder,
              private RutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.esNuevo = JSON.parse(this.RutaActiva.snapshot.params.esNuevo);
    this.titulo = this.esNuevo ? 'Agregar' : 'Editar';
    //debugger
    this.formularioArticulo = this.fbGenerator.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required]
    })

    if(!this.esNuevo){
      this.articulo = this.ArticuloInyectado.articulo;
      this.formularioArticulo.setValue({
        title: this.articulo.title,
        body: this.articulo.body,
        userId: this.articulo.userId
      })
    }

    this.ArticuloInyectado.leerTodosLosUsuarios().subscribe((usuariosRecibidos)=>{
      this.usuarios = usuariosRecibidos;
    })
  }
  agregar(){
    this.articulo= this.formularioArticulo.value as Articulo;
    this.ArticuloInyectado.guardarArticulo(this.articulo).subscribe((articuloRecibido)=>{
      console.log(articuloRecibido);
      console.log("Agregado");
      this.formularioArticulo.reset();
    })
  }

  editar(){
    this.articulo.title = this.formularioArticulo.value.title;
    this.articulo.body = this.formularioArticulo.value.body;
    this.articulo.userId = this.formularioArticulo.value.userId;

    this.ArticuloInyectado.actualizarArticulo(this.articulo).subscribe((articuloRecibido)=>{
      console.log("Editado Correctamente");
      console.log(articuloRecibido);
    })
  }

}
