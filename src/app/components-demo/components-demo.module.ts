import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ListModule } from './01-display-data/list.module';
import { CommunicationModule } from './02-communication/communication.module';
import { HostModule } from './03-host/host.module';
import { ProjectionModule } from './04-projection/projection.module';
import { StylingModule } from './05-styling/styling.module';
import { LifecycleHooksModule } from './06-lifecycle-hooks/lifecycle-hooks.module';
import { ChangeDetectionModule } from './07-change-detection-strategies/change-detection-strategies.module';
import { DynamicComponentLoadingModule } from './08-dynamic-component-loading/dynamic-component-loading.module';
import { ComponentsDemoComponent } from './components-demo.component';

const modules = [
  ChangeDetectionModule,
  CommunicationModule,
  DynamicComponentLoadingModule,
  HostModule,
  LifecycleHooksModule,
  ListModule,
  ProjectionModule,
  StylingModule,
];

@NgModule({
  declarations: [ComponentsDemoComponent],
  imports: [CommonModule, FormsModule, ...modules],
  exports: [ComponentsDemoComponent, ...modules],
  providers: [],
})
export class ComponentsDemoModule {}
