import { ModalComponent } from './modal/modal.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'myorders', component: MyOrdersComponent },
  { path: 'updateProfile', component: UserProfileComponent },
  { path: 'userProfile', component: ModalComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
