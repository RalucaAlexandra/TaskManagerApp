using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TaskStatusesController : ControllerBase
    {
        private readonly DataContext _db;
        public TaskStatusesController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("api/taskstatuses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public List<TaskStatus> Get()
        {
            List<TaskStatus> taskStatuses = _db.TaskStatuses.ToList();
            return taskStatuses;
        }

        [HttpGet]
        [Route("api/taskstatuses/searchbytaskstatusid/{TaskStatusID}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetByTaskStatusID(int TaskStatusID)
        {
            TaskStatus taskStatus = _db.TaskStatuses.Where(temp => temp.TaskStatusID == TaskStatusID).FirstOrDefault();
            if (taskStatus != null)
            {
                return Ok(taskStatus);
            }
            else
                return NoContent();
        }

        [HttpPost]
        [Route("api/taskstatuses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public TaskStatus Post([FromBody] TaskStatus taskStatus)
        {
            _db.TaskStatuses.Add(taskStatus);
            _db.SaveChanges();

            TaskStatus existingTaskStatus = _db.TaskStatuses.Where(temp => temp.TaskStatusID == taskStatus.TaskStatusID).FirstOrDefault();
            return taskStatus;
        }

        [HttpPut]
        [Route("api/taskstatuses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public TaskStatus Put([FromBody] TaskStatus project)
        {
            TaskStatus existingTaskStatus = _db.TaskStatuses.Where(temp => temp.TaskStatusID == project.TaskStatusID).FirstOrDefault();
            if (existingTaskStatus != null)
            {
                existingTaskStatus.TaskStatusName = project.TaskStatusName;
                _db.SaveChanges();
                return existingTaskStatus;
            }
            else
            {
                return null;
            }
        }

        [HttpDelete]
        [Route("api/taskstatuses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public int Delete(int TaskStatusID)
        {
            TaskStatus existingTaskStatus = _db.TaskStatuses.Where(temp => temp.TaskStatusID == TaskStatusID).FirstOrDefault();
            if (existingTaskStatus != null)
            {
                _db.TaskStatuses.Remove(existingTaskStatus);
                _db.SaveChanges();
                return TaskStatusID;
            }
            else
            {
                return -1;
            }
        }
    }
}