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
    this.salida=this.addHeaders();
    this.ast_code=KeepData.getInstance().getFinalASTCode();
  }

  addHeaders(){
    // encabezado de siempre
    let salida=`#include <stdio.h> //importar para el uso de printf
float Heap[100000]; //estructura heap
float Stack[100000]; //estructura stack
float SP; //puntero Stack pointer
float HP; //puntero Heap pointer
float `;

    // declaracion de temporales
    for (let i = 0; i < KeepData.getInstance().tmp_cnt; i++) {
      if(i==0){
        salida+='T'+i;
      }else{
        salida+=', T'+i;
      }
    }

    salida+=`;
    
    
    
void main()
{
  `;

    salida+=KeepData.getInstance().codigo;

    salida+='printf("%f", T'+(KeepData.getInstance().tmp_cnt-1)+');\nreturn;\n}'

    return salida;
  }

  
}
