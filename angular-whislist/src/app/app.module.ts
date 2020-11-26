import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinoViajeEffects, DestinoViajeState, InitializeDestinoViajeState, reducerDestinoViajes } from './Models/destino-vieaje-state.model';
import { StoreModule as NgrxStoreModule, ActionReducerMap} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home', component: ListaDestinosComponent},
  {path:'destino', component: DestinoDetalleComponent}
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

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
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
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
