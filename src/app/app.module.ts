// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

// Components
import {AppComponent} from './app.component';
import {ApartmentsComponent} from './apartments.component';
import {ApartmentDetailComponent} from './apartment-detail.component';
import {DashboardComponent} from './dashboard.component';
import {ApartmentAddComponent} from './apartment-add.component';
import {ApartmentUpdateComponent} from './apartment-update.component';

// Services
import {ApartmentService} from './apartment.service';

@NgModule({
    declarations: [
        AppComponent,
        ApartmentDetailComponent,
        ApartmentsComponent,
        DashboardComponent,
        ApartmentAddComponent,
        ApartmentUpdateComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [ApartmentService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
