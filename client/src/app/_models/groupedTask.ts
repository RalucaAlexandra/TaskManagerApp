import { Task } from "./task";
import { TaskPriority } from "./taskPriority";

export class GroupedTask
{
    taskStatusName: string;
    tasks: Task[];
 

    constructor()
    {
        this.taskStatusName = null;
        this.tasks = null;
        
    }
}
