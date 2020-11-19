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
  updates :string[];
  api : DestinosApiClient;
  constructor() {
    this.api = new DestinosApiClient();
    this.onItemAdded = new EventEmitter();
    this.updates = [];

    this.api.subscribeOnChange((d :DestinoViaje) => {
      if(d != null){
          this.updates.push("se ha elegido a " + d.nombre);
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.api.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d :DestinoViaje){
    this.api.elegir(d);
  }

}
