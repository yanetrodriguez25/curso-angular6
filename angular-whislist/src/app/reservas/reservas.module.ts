import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListadoComponent } from './reservas-listado/reservas-listado.component';
import { ReservasDetalleComponent } from './reservas-detalle/reservas-detalle.component';


@NgModule({
  declarations: [ReservasListadoComponent, ReservasDetalleComponent],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ]
})
export class ReservasModule { }
