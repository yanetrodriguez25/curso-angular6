import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DestinosApiClient } from '../Models/destinos-api-client-models';
import { DestinoViaje } from './../Models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;

  api: DestinosApiClient;
  
  constructor() {
    this.onItemAdded = new EventEmitter();
  	this.api = new DestinosApiClient();
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.api.destinos.push(d);
    this.onItemAdded.emit(d);
  }

  elegido(d :DestinoViaje){
    this.api.destinos.forEach(function(x){ x.setSelected(false);});
    d.setSelected(true);
  }

}
