import { PipesDemoComponent } from "./pipes-demo.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BuiltInPipesModule } from "./01-built-in-pipes/built-in-pipes.module";
import { UsePipeInCodeModule } from "./02-use-pipe-in-code/use-pipe-in-code.module";
import { UsePurePipeModule } from "./03-use-pure-pipe/use-pure-pipe.module";
import { UsePipeResultModule } from "./04-use-pipe-result/use-pipe-result.module";

const modules = [
  BuiltInPipesModule,
  UsePipeInCodeModule,
  UsePurePipeModule,
  UsePipeResultModule,
];

@NgModule({
  declarations: [PipesDemoComponent],
  imports: [CommonModule, ...modules],
  providers: [],
  bootstrap: [],
  exports: [...modules, PipesDemoComponent],
})
export class PipesDemoModule {}
