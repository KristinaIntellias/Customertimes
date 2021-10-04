import { HomeComponent } from './shared/components/home/home.component';
import { AppComponent } from './../app.component';
import { CustomPreloadingStrategy } from './core';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  ExtraOptions,
  PreloadAllModules,
} from '@angular/router';
import {
  PathNotFoundComponent,
  AboutComponent,
  MessagesComponent,
  LoginComponent,
} from './shared/components';
import { MetaDefinition } from '@angular/platform-browser';

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'User Manager Application. This is an SPA application',
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA Application, Routing',
  },
];

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home Page',
      meta: metaTags,
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages',
  },
  // {
  //   path: 'admin',
  //   canLoad: [AuthGuard],
  //   loadChildren: () =>
  //     import('./admin/admin.module').then((m) => m.AdminModule),
  //   data: { title: 'Admin' },
  // },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: {
      preload: true,
      title: 'Users',
    },
  },
  {
    path: '**',
    component: PathNotFoundComponent,
  },
];

const config: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategy, //PreloadAllModules
  // enableTracing: true,
  // useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
