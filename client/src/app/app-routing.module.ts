import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { MastersComponent } from './admin/masters/masters.component';
import { CreateTaskComponent } from './employee/create-task/create-task.component';
import { EditTaskComponent } from './employee/edit-task/edit-task.component';
import { EmployeePanelComponent } from './employee/employee-panel/employee-panel.component';
import { TasksComponent } from './employee/tasks/tasks.component';
import { UpdateTaskComponent } from './employee/update-task/update-task.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeGuard } from './_guards/employee.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component:  MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component:  MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'masters', component: MastersComponent, canActivate: [AdminGuard]},
      {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
      {path: 'projects', component: ProjectsComponent, canActivate: [AdminGuard]},
      {path: 'employee/tasks', component: TasksComponent, canActivate: [EmployeeGuard]},
      {path: 'employee/createtask', component: CreateTaskComponent, canActivate: [EmployeeGuard]},
      {path: 'edittask/:taskid', component: EditTaskComponent, canActivate: [EmployeeGuard]},
      {path: 'updatetaskstatus/:taskid', component: UpdateTaskComponent, canActivate: [EmployeeGuard]},

    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
