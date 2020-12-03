import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';
import { DestinosApiClient } from './../../Models/destinos-api-client-models';
import { DestinoViaje } from './../../Models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers:[DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates :string[];
  all;

  constructor(public api: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
    .subscribe(data => {
      const d = data;
      if(d != null){
        this.updates.push("se ha elegido a " + d.nombre);
      }
    });

    store.select(state => state.destinos.items)
    .subscribe(items => this.all = items);
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
