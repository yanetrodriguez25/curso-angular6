import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from 'src/app/Models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/Models/destinos-api-client-models';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';

/*
class DestinoApiClientViejo {
  getById(id :string) :DestinoViaje {
    console.log('llamando a la clase vieja');
    return null;
  }
}

interface AppConfig {
  apiEndpoint :string;
}

const APP_CONFIG_VALUE : AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store:Store<AppState>){
    super(store);
  }
  getById(id :string) :DestinoViaje{
    console.log('llamado por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}*/

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    DestinosApiClient
   // {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
   // {provide: DestinosApiClient, useClass: DestinosApiClientDecorated},
   // {provide: DestinoApiClientViejo, useExisting: DestinosApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino :DestinoViaje
  style= {
    sources: {
      world: {
        type:'geojson',
        data:'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers:[{
      'id':'countries',
      'type':'fill',
      'source':'world',
      'layout':{},
      'paint':{
        'fill-color':'#6F788A'
      }
    }]
  };
  constructor(private route: ActivatedRoute, private destinoApiClient: DestinosApiClient ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinoApiClient.getById(id);
  }

}
