using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext _db;
        public ProjectsController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public List<Project> Get()
        {
            List<Project> projects = _db.Projects.ToList();
            return projects;
        }


        [HttpPost]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public Project Post([FromBody] Project project)
        {
            _db.Projects.Add(project);
            _db.SaveChanges();

            Project existingProject = _db.Projects.Where(temp => temp.ProjectID == project.ProjectID).FirstOrDefault();
            return project;
        }

        [HttpPut]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public Project Put([FromBody] Project project)
        {
            Project existingProject = _db.Projects.Where(temp => temp.ProjectID == project.ProjectID).FirstOrDefault();
            if (existingProject != null)
            {
                existingProject.ProjectName = project.ProjectName;
                existingProject.DateOfStart = project.DateOfStart;
                existingProject.TeamSize = project.TeamSize;
                _db.SaveChanges();
               
                return existingProject;
            }
            else
            {
                return null;
            }
        }

        [HttpDelete]
        [Route("api/projects")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public int Delete(int ProjectID)
        {
            Project existingProject = _db.Projects.Where(temp => temp.ProjectID == ProjectID).FirstOrDefault();
            if (existingProject != null)
            {
                _db.Projects.Remove(existingProject);
                _db.SaveChanges();
                return ProjectID;
            }
            else
            {
                return -1;
            }
        }

    }
}