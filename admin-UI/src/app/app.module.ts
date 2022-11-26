import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { allRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromContainers from '../app/results/containers/index';
import * as fromComponents from '../app/results/components';
@NgModule({
  declarations: [
    AppComponent,
    fromContainers.containers,
    fromComponents.componentContainer,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(allRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
