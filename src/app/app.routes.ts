import { Routes } from '@angular/router';
import { ListemployeesComponent } from './employees/listemployees.component';
import { AddoreditemployeeComponent } from './employees/addoreditemployee/addoreditemployee.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'list', component:ListemployeesComponent},
    {path:'addeditemployee', component:AddoreditemployeeComponent},
    {path:'login', component:LoginComponent},    
    {path:'', redirectTo:'/login', pathMatch:'full'},
    { path: '**', redirectTo: '' }
];
