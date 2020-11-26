import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import {DestinoViaje} from './destino-viaje.model'
import { ElegidoFavoritoAction, NuevoDestinoAction, VoteUpAction } from './destino-vieaje-state.model';

@Injectable()
export class DestinosApiClient {
    constructor(private store: Store<AppState>){
    }

    add(d :DestinoViaje) {
        this.store.dispatch(new NuevoDestinoAction(d));
    }

    elegir(d :DestinoViaje){
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }
}