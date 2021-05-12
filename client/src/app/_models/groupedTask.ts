import { Task } from "./task";

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
