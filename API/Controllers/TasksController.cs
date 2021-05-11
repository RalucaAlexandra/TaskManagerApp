using System;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace API.Controllers
{
    public class TasksController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly UserManager<AppUser> _userManager;
        public TasksController(DataContext db, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/createtask")]
        public IActionResult Post([FromBody] Task task)
        {
            task.Project = null;
            task.CreatedByUser = null;
            task.AssignedToUser = null;
            task.TaskPriority = null;
            task.TaskStatusDetails = null;
            task.CreatedOn = DateTime.Now;
            task.LastUpdatedOn = DateTime.Now;
            task.CurrentStatus = "Holding";
            task.CurrentTaskStatusID = 1;
            task.CreatedOnString = task.CreatedOn.ToString("dd/MM/yyyy");
            task.LastUpdatedOnString = task.LastUpdatedOn.ToString("dd/MM/yyyy");
            task.CreatedBy = 25;

            _db.Tasks.Add(task);
            _db.SaveChanges();

            TaskStatusDetail taskStatusDetail = new TaskStatusDetail();
            taskStatusDetail.TaskID = task.TaskID;
            taskStatusDetail.UserID = task.CreatedBy;
            taskStatusDetail.TaskStatusID = 1;
            taskStatusDetail.StatusUpdationDateTime = DateTime.Now;
            taskStatusDetail.TaskStatus = null;
            taskStatusDetail.User = null;
            taskStatusDetail.Description = "Task Created";
            _db.TaskStatusDetails.Add(taskStatusDetail);
            _db.SaveChanges();

            Task existingTask = _db.Tasks.Where(temp => temp.TaskID == task.TaskID).FirstOrDefault();
            return Ok(existingTask);

        }
    }
}