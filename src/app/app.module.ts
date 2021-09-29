import { RoutingDemoModule } from './routing-demo/routing-demo.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { ServicesDemoModule } from './services-demo/services-demo.module';
import { AppComponent } from './app.component';
import { PipesDemoModule } from './pipes-demo/pipes-demo.module';
import { ComponentsDemoModule } from './components-demo/components-demo.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    ComponentsDemoModule,
    PipesDemoModule,
    ServicesDemoModule,
    RoutingDemoModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA /* or NO_ERRORS_SCHEMA  */]
})
export class AppModule {}
