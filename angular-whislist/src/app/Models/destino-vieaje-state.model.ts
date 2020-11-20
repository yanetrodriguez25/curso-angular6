import {DestinoViaje} from './destino-viaje.model'
import {Action} from '@ngrx/store'
import {Actions, Effect, ofType} from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

export interface DestinoViajeState{
    items :DestinoViaje[];
    loading :boolean;
    favorito :DestinoViaje;
}

export const InitializeDestinoViajeState = function() {
    return {
        items :[],
        loading :false,
        favorito : null
    }
}

export enum DestinoViajeActionTypes {
    NUEVO_DESTINO = '[Destinos viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos viajes] Favorito'
}

export class NuevoDestinoAction implements Action {
    type = DestinoViajeActionTypes.NUEVO_DESTINO;
    constructor(public destino :DestinoViaje){}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinoViajeActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino :DestinoViaje){}
}

export type DestinoViajeActions = NuevoDestinoAction | ElegidoFavoritoAction;

export function reducerDestinoViajes(
    state: DestinoViajeState,
    action: DestinoViajeActions
): DestinoViajeState {
    switch(action.type){
        case DestinoViajeActionTypes.NUEVO_DESTINO:{
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinoViajeActionTypes.ELEGIDO_FAVORITO : {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViaje = (action as NuevoDestinoAction).destino;
            fav.setSelected(true);
            return {
                ...state,
                favorito:fav
            };
        }
    }
    return state;
}

@Injectable()
export class DestinoViajeEffects {
    @Effect()
    nuevoAgregado$ : Observable<Action> = this.actions$.pipe(
        ofType(DestinoViajeActionTypes.NUEVO_DESTINO),
        map((action :NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    )

    constructor(private actions$: Actions){}
}
