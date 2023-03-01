import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { HttpClientModule } from'@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerDashboardModule,
    AdminDashboardModule,
    FooterComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
