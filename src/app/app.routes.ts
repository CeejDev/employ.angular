import { Routes } from '@angular/router';
import { ReadComponent } from './components/read/read';
import { CreateComponent } from './components/create/create';
import { UpdateComponent } from './components/update/update';

export const routes: Routes = [
  { path: '', component: ReadComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent }
];
