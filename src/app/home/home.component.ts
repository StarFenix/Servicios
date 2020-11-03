import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulo'
import { UsuarioService } from '../services/usuario.service';
import { ArticulosService } from '../services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>()
  constructor(public UsuarioInyectado: UsuarioService, public ArticuloInyectado: ArticulosService,
    private Ruta: Router) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerNoticias().subscribe((articulosDesdeAPI)=>{
      this.articulos = articulosDesdeAPI;
    });

    let articuloEnviar: Articulo = new Articulo();
    articuloEnviar.body= 'Cuerpo del artículo';
    articuloEnviar.title = 'Título del artículo';
    articuloEnviar.userId = 8;
    this.ArticuloInyectado.guardarArticulo(articuloEnviar).subscribe((articuloCreado)=>{
     // debugger
      this.articulos.push(articuloCreado);
     })

  }

  verDetalle(art: Articulo){
    this.ArticuloInyectado.articulo=art;
    this.Ruta.navigateByUrl('articuloDetalle')
  }

  borrar(id: number) {
    this.ArticuloInyectado.borrarArticulo(id).subscribe((datos)=>{
      console.log(datos);
      console.log("Eliminado correctamente");
    })
  }

  editar(art){
    art.title= "Títilo Editado";
    art.body= "Cuerpo Editado";
    this.ArticuloInyectado.actualizarArticulo(art).subscribe((articuloActualizado)=>{
      console.log(articuloActualizado);
    })
  }

}
