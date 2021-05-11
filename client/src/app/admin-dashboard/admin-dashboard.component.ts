import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  Designation: string = "";
  Username: string = "";
  NoOfTeamMembers: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;

  Projects: string[] = [];
  Years: number[] = [];
  TeamMembersSummary = [];
  TeamMembers = [];
  ProjectDeadline: Date;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.Designation = "Team Leader";
    this.Username = "John Mark";
    this.NoOfTeamMembers = 67;
    this.PendingTasks = 15;
    this.UpComingProjects = 2;
    //this.ProjectDeadline = new Date();

    this.Projects = ["Project A" ,"Project B" , "Project C", "Project D"];

    for (var i = 2021; i >= 2017; i--) {
      this.Years.push(i);
    }

    this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary();

    this.TeamMembers = [
      {
        Job: 'Admin',
        Members: [
          { ID: 1, Name: 'Ford', Status: 'Available' }
        ],
      },
      {
        Job: 'Project Managers',
        Members: [
          { ID: 2, Name: 'Anna', Status: 'Available' },
          { ID: 3, Name: 'Arun', Status: 'Available' }
        ],
      },
      {
        Job: 'QA Engineers',
        Members: [
          { ID: 4, Name: 'Krishna', Status: 'Available' },
          { ID: 5, Name: 'Mohan', Status: 'Available' },
          { ID: 6, Name: 'Raju', Status: 'Busy' },
          { ID: 7, Name: 'Farooq', Status: 'Available' },
        ],
      },
      {
        Job: 'Software Engineers',
        Members: [
          { ID: 8, Name: 'Jacob', Status: 'Available' },
          { ID: 9, Name: 'Smith', Status: 'Available' },
          { ID: 10, Name: 'Jones', Status: 'Busy' },
          { ID: 11, Name: 'Smith', Status: 'Available' },
          { ID: 12, Name: 'Jacob', Status: 'Available' },
          { ID: 13, Name: 'Smith', Status: 'Available' },
          { ID: 14, Name: 'Jones', Status: 'Busy' },
          { ID: 15, Name: 'James', Status: 'Busy' },
          { ID: 16, Name: 'Jacob', Status: 'Available' },
          { ID: 17, Name: 'Smith', Status: 'Available' },
          { ID: 18, Name: 'Smith', Status: 'Available' },
          { ID: 19, Name: 'James', Status: 'Busy' },
          { ID: 20, Name: 'Jacob', Status: 'Available' },
          { ID: 21, Name: 'Smith', Status: 'Available' },
          { ID: 22, Name: 'Smith', Status: 'Available' },
          { ID: 23, Name: 'Smith', Status: 'Available' },
          { ID: 24, Name: 'Smith', Status: 'Available' },
        ],
      },
    ];

  }

  onProjectChange($event) {
    if ($event.target.innerHTML == 'Project A') {
      this.ProjectDeadline = new Date('April 15, 2022');
    } else if ($event.target.innerHTML == 'Project B') {
      this.ProjectDeadline = new Date('August 23, 2021');
    } else if ($event.target.innerHTML == 'Project C') {
      this.ProjectDeadline = new Date('September 19, 2023');
    } else if ($event.target.innerHTML == 'Project D') {
      this.ProjectDeadline = new Date('July 2, 2021');
    }
  }

}
