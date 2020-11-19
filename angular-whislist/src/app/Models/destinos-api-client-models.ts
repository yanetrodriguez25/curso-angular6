import { BehaviorSubject, Subject } from 'rxjs';
import {DestinoViaje} from './destino-viaje.model'

export class DestinosApiClient {
    destinos : DestinoViaje[];
    current :Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor(){
        this.destinos = [];
    }

    add(d :DestinoViaje) {
        this.destinos.push(d);
    }

    getAll(): DestinoViaje[] {
        return this.destinos;
    }

    getById(id :string) :DestinoViaje {
        return this.destinos.filter(function(d){d.id.toString() == id; })[0];
    }
}