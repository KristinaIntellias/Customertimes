import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ComponentsModule } from './components/components.module';

import { ProvidedInModule } from './components';
import { ServicesDemoComponent } from './services-demo.component';

@NgModule({
  declarations: [ServicesDemoComponent],
  imports: [CommonModule, ComponentsModule, ProvidedInModule],
  exports: [ServicesDemoComponent],
})
export class ServicesDemoModule {}
