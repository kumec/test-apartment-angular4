import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent}   from './dashboard.component';
import {ApartmentsComponent}      from './apartments.component';
import {ApartmentDetailComponent}  from './apartment-detail.component';
import {ApartmentAddComponent} from './apartment-add.component';
import {ApartmentUpdateComponent} from './apartment-update.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'detail/:id', component: ApartmentDetailComponent},
    {path: 'update/:id', component: ApartmentUpdateComponent},
    {path: 'apartments', component: ApartmentsComponent},
    {path: 'add', component: ApartmentAddComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
