
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayParcelComponent } from './display-parcel/display-parcel.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // http://localhost:4200
  { path: 'parcels', component: DisplayParcelComponent }, // http://localhost:4200/products
  { path: 'addparcel', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
