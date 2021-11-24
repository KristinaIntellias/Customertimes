import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CustomPreloadingStrategy, MessagesService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-routing-demo',
  templateUrl: './routing-demo.component.html',
  styleUrls: ['./routing-demo.component.css'],
})
export class RoutingDemoComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    public readonly spinner: SpinnerService,
    public readonly messagesService: MessagesService,
    private readonly preloadStrategy: CustomPreloadingStrategy,
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // console.log('MODULES:');
    // console.log(this.preloadStrategy.preloadedModules);

    this.setPageTitle();
    this.showRouterTree();
  }

  showRouterTree() {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(this.router.config, replacer, 2));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private setPageTitle() {
    this.sub = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data)
      )
      .subscribe((data) => this.titleService.setTitle(data.title));
  }

  onActivate(event: any, routerOutlet: RouterOutlet): void {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate(event: any, routerOutlet: RouterOutlet): void {}

  onDisplayMessages() {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
}
