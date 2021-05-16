using System;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet]
        [Route("api/tasks/searchbytaskid/{TaskID}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetByTaskID(int TaskID)
        {
            //Get task from database
            Task task = _db.Tasks
                .Include(temp => temp.CreatedByUser)
                .Include(temp => temp.AssignedToUser)
                .Include(temp => temp.Project)
                .Include(temp => temp.TaskStatusDetails)
                .Include(temp => temp.TaskPriority)
                .Where(temp => temp.TaskID == TaskID)
                .FirstOrDefault();

            if (task != null)
            {
                //Date conversion
                task.CreatedOnString = task.CreatedOn.ToString("dd/MM/yyyy");
                task.LastUpdatedOnString = task.LastUpdatedOn.ToString("dd/MM/yyyy");

                foreach (var item2 in task.TaskStatusDetails)
                {
                    item2.StatusUpdationDateTimeString = item2.StatusUpdationDateTime.ToString("dd/MM/yyyy");
                }

                return Ok(task);
            }
            else
                return NoContent();
        }

        [HttpPut]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("/api/updatetaskstatus")]
        public IActionResult UpdateTaskStatus([FromBody] TaskStatusDetail taskStatusDetail)
        {
            //Insert task status detail
            taskStatusDetail.UserID = int.Parse(_userManager.GetUserId(HttpContext.User));
            taskStatusDetail.StatusUpdationDateTime = DateTime.Now;
            taskStatusDetail.StatusUpdationDateTimeString = taskStatusDetail.StatusUpdationDateTime.ToString("dd/MM/yyyy");
            taskStatusDetail.TaskStatus = null;
            taskStatusDetail.User = null;
            _db.TaskStatusDetails.Add(taskStatusDetail);
            _db.SaveChanges();

            //Update existing task
            Task existingTask = _db.Tasks.Where(temp => temp.TaskID == taskStatusDetail.TaskID).FirstOrDefault();
            existingTask.LastUpdatedOn = DateTime.Now;
            existingTask.CurrentStatus = _db.TaskStatuses.Where(temp => temp.TaskStatusID == taskStatusDetail.TaskStatusID).FirstOrDefault().TaskStatusName;
            existingTask.CurrentTaskStatusID = taskStatusDetail.TaskStatusID;
            _db.SaveChanges();

            return Ok(taskStatusDetail);
        }

         //[Authorize(Policy = "RequireDeveloperRole")]
        [HttpGet]
       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/tasks")]
        public IActionResult Get()
        {
        List<GroupedTask> grouppedTasks = new List<GroupedTask>();
        List<TaskStatus> taskStatuses = _db.TaskStatuses.ToList();
          List<Task> tasks = _db.Tasks
            .Include(temp => temp.CreatedByUser)
            .Include(temp => temp.AssignedToUser)
            .Include(temp => temp.TaskStatusDetails)
            .Include(temp => temp.Project)
            .Include(temp => temp.TaskPriority)
            .OrderBy(temp =>temp.TaskPriorityID)
            .ThenByDescending(temp => temp.LastUpdatedOn).ToList();

            foreach (var item in tasks)
            {
                item.CreatedOnString = item.CreatedOn.ToString("dd/MM/yyyy");
                item.LastUpdatedOnString = item.LastUpdatedOn.ToString("dd/MM/yyyy");
                item.TaskStatusDetails = item.TaskStatusDetails.OrderByDescending(temp => temp.TaskStatusDetailID).ToList();

                foreach(var item2 in item.TaskStatusDetails)
                {
                    item2.StatusUpdationDateTimeString = item2.StatusUpdationDateTime.ToString("dd/MM/yyyy");
                }
            }

            foreach (var item in taskStatuses)
            {
                GroupedTask groupedTask = new GroupedTask();
                groupedTask.TaskStatusName = item.TaskStatusName;
                groupedTask.Tasks = tasks.Where(temp => temp.CurrentStatus == item.TaskStatusName).ToList();

                if(groupedTask.Tasks.Count > 0){
                    grouppedTasks.Add(groupedTask);}
                
            }
         
            return Ok(grouppedTasks);
            
        }


        [HttpPost]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
            task.CreatedBy = int.Parse(_userManager.GetUserId(HttpContext.User));

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