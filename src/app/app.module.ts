import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule, } from '@coreui/angular';
// Import routing module
import { AppRoutingModule } from './app.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ConfigurationsComponent } from './views/configurations/configurations.component';
import { TitlePageComponent } from './components/title-page/title-page.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    TableViewComponent,
    ConfigurationsComponent,
    TitlePageComponent,
  ],
  providers: [
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
