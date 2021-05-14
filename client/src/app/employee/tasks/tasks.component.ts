import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedTask } from 'src/app/_models/groupedTask';
import { Task } from 'src/app/_models/task';
import { TaskPriority } from 'src/app/_models/taskPriority';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { TasksService } from 'src/app/_services/tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

 
  taskGroup: GroupedTask[];
  baseUrl = environment.apiUrl;
 
  constructor(private tasksService: TasksService, public membersService: MembersService,public accountService:AccountService, private httClient: HttpClient)
  {
  }

  ngOnInit(): void {
   this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroup = response;
    });
  }

}