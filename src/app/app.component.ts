import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  demoExamplesGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.demoExamplesGroup = this.fb.group({
      pipesDemo: false,
      componentsDemo: true,
      servicesDemo: false,
      routingDemo: false,
      formsDemo: false,
    });
  }
}
