using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TaskPriorityController : ControllerBase
    {
        private readonly DataContext _db;
        public TaskPriorityController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("api/taskpriorities")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public List<TaskPriority> Get()
        {
            List<TaskPriority> taskPriorities = _db.TaskPriorities.ToList();
            return taskPriorities;
        }

        [HttpGet]
        [Route("api/taskpriorities/searchbytaskpriorityid/{TaskPriorityID}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetByTaskPriorityID(int TaskPriorityID)
        {
            TaskPriority taskPriority = _db.TaskPriorities.Where(temp => temp.TaskPriorityID == TaskPriorityID).FirstOrDefault();
            if (taskPriority != null)
            {
                return Ok(taskPriority);
            }
            else
                return NoContent();
        }

        [HttpPost]
        [Route("api/taskpriorities")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public TaskPriority Post([FromBody] TaskPriority taskPriority)
        {
            _db.TaskPriorities.Add(taskPriority);
            _db.SaveChanges();

            TaskPriority existingTaskPriority = _db.TaskPriorities.Where(temp => temp.TaskPriorityID == taskPriority.TaskPriorityID).FirstOrDefault();
            return taskPriority;
        }

        [HttpPut]
        [Route("api/taskpriorities")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public TaskPriority Put([FromBody] TaskPriority project)
        {
            TaskPriority existingTaskPriority = _db.TaskPriorities.Where(temp => temp.TaskPriorityID == project.TaskPriorityID).FirstOrDefault();
            if (existingTaskPriority != null)
            {
                existingTaskPriority.TaskPriorityName = project.TaskPriorityName;
                _db.SaveChanges();
                return existingTaskPriority;
            }
            else
            {
                return null;
            }
        }

        [HttpDelete]
        [Route("api/taskpriorities")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public int Delete(int TaskPriorityID)
        {
            TaskPriority existingTaskPriority = _db.TaskPriorities.Where(temp => temp.TaskPriorityID == TaskPriorityID).FirstOrDefault();
            if (existingTaskPriority != null)
            {
                _db.TaskPriorities.Remove(existingTaskPriority);
                _db.SaveChanges();
                return TaskPriorityID;
            }
            else
            {
                return -1;
            }
        }
    }

}