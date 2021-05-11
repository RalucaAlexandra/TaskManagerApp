import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Project } from 'src/app/_models/project';
import { TaskPriority } from 'src/app/_models/taskPriority';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ProjectsService } from 'src/app/_services/projects.service';
import { TaskPrioritiesService } from 'src/app/_services/task-priorities.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  projects: Observable<Project[]>;
  employees: Observable<any>;
  taskPriorities: Observable<TaskPriority[]>;


  constructor(private formBuilder:FormBuilder, private tasksService: TasksService, private router: Router, 
      private projectsService: ProjectsService, private taskPrioritiesService: TaskPrioritiesService, 
        private accountServices:AccountService)
  {
  }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [ Validators.required ]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [ Validators.required ]),
      assignedTo: new FormControl(null, [ Validators.required ]),
      taskPriorityID: new FormControl(2, [ Validators.required ])
    });

    this.projects = this.projectsService.getAllProjects();
    this.employees = this.accountServices.getAllEmployees();
    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();

  }

  onCreateTaskClick(event)
  {
    this.newTaskForm["submitted"] = true;

    if (this.newTaskForm.valid)
    {
      this.tasksService.insertTask(this.newTaskForm.value).subscribe(() => {
        this.router.navigate( [ "/employee", "tasks" ]);
      }, (error) => {
        console.log(error);
      });
    }
    else
    {
      console.log(this.newTaskForm.errors);
    }
  }

}
