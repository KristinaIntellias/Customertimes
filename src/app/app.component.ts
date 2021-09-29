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
      pipesDemo: this.fb.control(false),
      componentsDemo: this.fb.control(false),
      servicesDemo: this.fb.control(false),
      routingDemo: this.fb.control(true),
    });
  }
}
