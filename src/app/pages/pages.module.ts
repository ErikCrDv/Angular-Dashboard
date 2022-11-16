import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
  ]
})
export class PagesModule { }
