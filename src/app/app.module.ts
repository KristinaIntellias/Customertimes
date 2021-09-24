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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ComponentsDemoModule,
    ReactiveFormsModule,
    FormsModule,
    PipesDemoModule,
    ServicesDemoModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA /* or NO_ERRORS_SCHEMA  */]
})
export class AppModule {}
