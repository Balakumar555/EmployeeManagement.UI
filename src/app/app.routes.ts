import { Routes } from '@angular/router';
import { ListemployeesComponent } from './employees/listemployees.component';
import { AddoreditemployeeComponent } from './employees/addoreditemployee/addoreditemployee.component';

export const routes: Routes = [
    {path:'list', component:ListemployeesComponent},
    { path:'', redirectTo:'/list', pathMatch:'full'},
    {path:'addeditemployee', component:AddoreditemployeeComponent}
];
