import { Component, OnInit } from '@angular/core';
import NodoAST from '../../models/NodoAST/NodoAST';
import KeepData from '../models/Analisis/KeepData';
declare var require: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  entrada;
  salida;
  ngOnInit() {

  }
  analizar(){
    var parser = require('../models/Analisis/grammar');
    var respuesta:NodoAST=parser.parse(this.entrada);  
    KeepData.getInstance().resetAll();
    respuesta.ejecutar();
    this.salida=KeepData.getInstance().codigo;
    console.log(this.salida);
  }
}
