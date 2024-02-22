import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { CrudComponent } from './crud/crud.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'exam',
    component: ExamComponent,
  },
  {
    path: 'crud',
    component: CrudComponent,
  },
  {
    path: 'chart',
    component: LineChartComponent,
  },
  {
    path: 'date',
    component: DatePickerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
