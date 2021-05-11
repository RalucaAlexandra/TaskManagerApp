import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/_models/taskPriority';
import { TaskPrioritiesService } from 'src/app/_services/task-priorities.service';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.css']
})
export class TaskPrioritiesComponent implements OnInit {
   //Objects for Holding Model Data
   taskPriorities: TaskPriority[] = [];
 
   //Objects for Delete
   deleteTaskPriority: TaskPriority = new TaskPriority();
   editIndex: number = null;
   deleteIndex: number = null;
 
 
   //Reactive Forms
   newForm: FormGroup;
   editForm: FormGroup;
 
   //Autofocus TextBoxes
   @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef;
   @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef;
 
   //Constructor
   constructor(private taskPrioritiesService: TaskPrioritiesService, private formBuilder: FormBuilder)
   {
   }
 
   ngOnInit()
   {
     //Get data from database
     this.taskPrioritiesService.getTaskPriorities().subscribe(
       (response: TaskPriority[]) =>
       {
         this.taskPriorities = response;
       }
     );
 
     //Create newForm
     this.newForm = this.formBuilder.group({
       taskPriorityID: this.formBuilder.control(null),
       taskPriorityName: this.formBuilder.control(null, [Validators.required])
     });
 
     //Create editForm
     this.editForm = this.formBuilder.group({
       taskPriorityID: this.formBuilder.control(null),
       taskPriorityName: this.formBuilder.control(null, [Validators.required])
     });
   }
 
   onNewClick(event)
   {
     //reset the newForm
     this.newForm.reset({ taskPriorityID: 0 });
     setTimeout(() =>
     {
       //Focus the TaskPriority textbox in newForm
       this.defaultTextBox_New.nativeElement.focus();
     }, 100);
   }
 
   onSaveClick()
   {
     if (this.newForm.valid)
     {
       //Invoke the REST-API call
       this.taskPrioritiesService.insertTaskPriority(this.newForm.value).subscribe((response) =>
       {
         //Add Response to Grid
         var p: TaskPriority = new TaskPriority();
         p.taskPriorityID = response.taskPriorityID;
         p.taskPriorityName = response.taskPriorityName;
         this.taskPriorities.push(p);
 
         //Reset the newForm
         this.newForm.reset();
    
       }, (error) =>
         {
           console.log(error);
         });
     }
   }
 
   onEditClick(event, taskPriority: TaskPriority)
   {
     //Reset the editForm
     this.editForm.reset();
     setTimeout(() =>
     {
       //Set data into editForm
       this.editForm.patchValue(taskPriority);
       this.editIndex = this.taskPriorities.indexOf(taskPriority);
 
       //Focus the TaskPriority textbox in editForm
       this.defaultTextBox_Edit.nativeElement.focus();
     }, 100);
   }
 
   onUpdateClick()
   {
     if (this.editForm.valid)
     {
       //Invoke the REST-API call
       this.taskPrioritiesService.updateTaskPriority(this.editForm.value).subscribe((response: TaskPriority) =>
       {
         //Update the response in Grid
         this.taskPriorities[this.editIndex] = response;
 
         //Reset the editForm
         this.editForm.reset();
       },
         (error) =>
         {
           console.log(error);
         });
     }
   }
 
   onDeleteClick(event, taskPriority: TaskPriority)
   {
     //Set data into deleteTaskPriority
     this.deleteTaskPriority.taskPriorityID = taskPriority.taskPriorityID;
     this.deleteTaskPriority.taskPriorityName = taskPriority.taskPriorityName;
     this.deleteIndex = this.taskPriorities.indexOf(taskPriority);
   }
 
   onDeleteConfirmClick()
   {
     //Invoke the REST-API call
     this.taskPrioritiesService.deleteTaskPriority(this.deleteTaskPriority.taskPriorityID).subscribe(
       (response) =>
       {
         //Delete object in Grid
         this.taskPriorities.splice(this.deleteIndex, 1);
 
         //Clear deleteCountry
         this.deleteTaskPriority.taskPriorityID = null;
         this.deleteTaskPriority.taskPriorityName = null;
 
       },
       (error) =>
       {
         console.log(error);
       });
   }
 
}
