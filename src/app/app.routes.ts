import { Routes } from '@angular/router';
import { UsersComponent } from './users';
import { MapViewComponent } from './map-view';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: UsersComponent },
  { path: 'map-view/:id', component: MapViewComponent }
];
