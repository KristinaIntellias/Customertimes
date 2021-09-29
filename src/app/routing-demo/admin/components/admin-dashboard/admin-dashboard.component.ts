import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sessionID: Observable<string>;
  fragment: Observable<string>

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sessionID = this.route.queryParamMap.pipe(
      map((param: ParamMap): string => param.get('sessionID') || 'no session')
    );

    this.fragment = this.route.fragment.pipe(
      map((fragment): string => fragment || 'no fragments')
    );
  }
}
