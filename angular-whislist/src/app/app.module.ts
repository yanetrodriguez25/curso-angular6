import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, Injectable, InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinoViajeEffects, DestinoViajeState, InitializeDestinoViajeState, InitMyDataAction, reducerDestinoViajes } from './Models/destino-vieaje-state.model';
import { StoreModule as NgrxStoreModule, ActionReducerMap, Store} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http'
import Dexie from 'dexie';
import { DestinoViaje } from './Models/destino-viaje.model';

export interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig ={
  apiEndpoint: "http://localhost:3000"
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const childrenRoutesVuelos :Routes = [
  {path:'', redirectTo:'main', pathMatch: 'full'},
  {path:'main', component: VuelosMainComponent},
  {path:'mas-info', component: VuelosMasInfoComponent},
  {path:':id', component: VuelosDetalleComponent}
]

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home', component: ListaDestinosComponent},
  {path:'destino', component: DestinoDetalleComponent},
  {path:'login', component: LoginComponent},
  {path:'protected', component: ProtectedComponent, canActivate:[UsuarioLogueadoGuard]},
  {path:'vuelos', component:VuelosComponent, canActivate:[UsuarioLogueadoGuard], children: childrenRoutesVuelos}
];

//redux init
export interface AppState {
  destinos : DestinoViajeState;
};

const reducers :ActionReducerMap<AppState> = {
  destinos : reducerDestinoViajes
};

let reducersInitialState = {
  destinos : InitializeDestinoViajeState()
}
// fin redux init

//app init
export function init_app(appLoadService : AppLoadService) : () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store :Store<AppState>, private http :HttpClient){}
  async initializeDestinosViajesState() : Promise<any> {
    const headers :HttpHeaders= new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', {headers: headers});
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

@Injectable({
  providedIn:'root'
})
export class MyDatabase extends Dexie{
  destinos : Dexie.Table<DestinoViaje, number>;
  constructor(){
    super('MyDatabase');
    this.version(1).stores({
      destinos:'++id, nombre,imagenUrl'
    });
  }
}

export const db = new MyDatabase();

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgrxStoreModule.forRoot(reducers, {initialState : reducersInitialState,runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability:false
        }
    }),
    EffectsModule.forRoot([DestinoViajeEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard, 
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService,
    {provide: APP_INITIALIZER, useFactory:init_app, deps :[AppLoadService], multi:true},
    MyDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
