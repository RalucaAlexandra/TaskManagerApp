import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getTeamMembersSummary(): any[]
  {
    var TeamMembersSummary = [
      {
        Job: 'Admin',
        TeamMembersCount: 1,
        TemporarilyUnavailableMembers: 0,
      },
      {
        Job: 'Project Managers',
        TeamMembersCount: 2,
        TemporarilyUnavailableMembers: 0,
      },
      {
        Job: 'QA Engineers',
        TeamMembersCount: 4,
        TemporarilyUnavailableMembers: 1,
      },
      {
        Job: 'Software Engineers',
        TeamMembersCount: 17,
        TemporarilyUnavailableMembers: 3,
      },
    ];
    return TeamMembersSummary;
  }
}
