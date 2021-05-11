import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/_models/taskStatus';
import { TaskStatusesService } from 'src/app/_services/task-statuses.service';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {
   //Objects for Holding Model Data
   taskStatuses: TaskStatus[] = [];
 
   //Objects for Delete
   deleteTaskStatus: TaskStatus = new TaskStatus();
   editIndex: number = null;
   deleteIndex: number = null;

   //Reactive Forms
   newForm: FormGroup;
   editForm: FormGroup;
 
   //Autofocus TextBoxes
   @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef;
   @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef;
 

   //Constructor
   constructor(private taskStatusesService: TaskStatusesService, private formBuilder: FormBuilder)
   {
   }
 
   ngOnInit()
   {
     //Get data from database
     this.taskStatusesService.getTaskStatuses().subscribe(
       (response: TaskStatus[]) =>
       {
         this.taskStatuses = response;
       }
     );
 
     //Create newForm
     this.newForm = this.formBuilder.group({
       taskStatusID: this.formBuilder.control(null),
       taskStatusName: this.formBuilder.control(null, [Validators.required])
     });
 
     //Create editForm
     this.editForm = this.formBuilder.group({
       taskStatusID: this.formBuilder.control(null),
       taskStatusName: this.formBuilder.control(null, [Validators.required])
     });
   }

   onNewClick(event)
  {
    //reset the newForm
    this.newForm.reset({ taskStatusID: 0 });
    setTimeout(() =>
    {
      //Focus the TaskStatus textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick()
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusesService.insertTaskStatus(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        var p: TaskStatus = new TaskStatus();
        p.taskStatusID = response.taskStatusID;
        p.taskStatusName = response.taskStatusName;
        this.taskStatuses.push(p);

        //Reset the newForm
        this.newForm.reset();
      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick(event, taskStatus: TaskStatus)
  {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() =>
    {
      this.editForm.patchValue(taskStatus);
      this.editIndex = this.taskStatuses.indexOf(taskStatus);

      //Focus the TaskStatus textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick()
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusesService.updateTaskStatus(this.editForm.value).subscribe((response: TaskStatus) =>
      {
        //Update the response in Grid
        this.taskStatuses[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(event, taskStatus: TaskStatus)
  {
    //Set data into deleteTaskStatus
    this.deleteTaskStatus.taskStatusID = taskStatus.taskStatusID;
    this.deleteTaskStatus.taskStatusName = taskStatus.taskStatusName;
    this.deleteIndex = this.taskStatuses.indexOf(taskStatus);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.taskStatusesService.deleteTaskStatus(this.deleteTaskStatus.taskStatusID).subscribe(
      (response) =>
      {
        //Delete object in Grid
        this.taskStatuses.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskStatus.taskStatusID = null;
        this.deleteTaskStatus.taskStatusName = null;
      },
      (error) =>
      {
        console.log(error);
      });
  }

 
 

}
