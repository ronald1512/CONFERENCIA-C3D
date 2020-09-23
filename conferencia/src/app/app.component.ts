import { Component, OnInit } from '@angular/core';
import NodoAST from '../../models/NodoAST/NodoAST';
import KeepData from '../models/Analisis/KeepData';
import { HttpClient } from "@angular/common/http";
declare var require: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  entrada;
  salida;
  ast_code='';
  constructor(private httpClient: HttpClient){

  }
  ngOnInit() {
    this.abrirArchivoPruebas();
  }
  abrirArchivoPruebas(){
    this.httpClient.get("assets/pruebas/main_file.txt", { responseType: 'text' }).subscribe(data =>{
      this.entrada=data;
    })
  }

  analizar(){
    var parser = require('../models/Analisis/grammar');
    var respuesta:NodoAST=parser.parse(this.entrada);  
    KeepData.getInstance().resetAll();
    respuesta.ejecutar();
    respuesta.obtenerAscendente(0);
    this.salida=KeepData.getInstance().codigo;
    this.ast_code=KeepData.getInstance().getFinalASTCode();
    //console.log(this.salida);
  }

  
}
