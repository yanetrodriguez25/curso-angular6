import {
    reducerDestinoViajes,
    DestinoViajeState,
    InitializeDestinoViajeState,
    InitMyDataAction,
    NuevoDestinoAction
} from './destino-vieaje-state.model';

import {DestinoViaje} from './destino-viaje.model'

describe('reducerDestinoViajes', ()=> {
    it('should reduce init data', () => {
        const prevState : DestinoViajeState = InitializeDestinoViajeState();
        const action :InitMyDataAction = new InitMyDataAction(['Destino 1', 'Desitno 2']);
        const newState :DestinoViajeState = reducerDestinoViajes(prevState, action);
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('Destino 1');
    });

    it('should reduce new item added', () => {
        const prevState : DestinoViajeState = InitializeDestinoViajeState();
        const action : NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona', 'url'));
        const newState :DestinoViajeState = reducerDestinoViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('Barcelona');
    });
})