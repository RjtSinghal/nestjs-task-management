import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, desciption: string): Task {
        const task: Task = {
            id: uuid(),
            title: title,
            desciption: desciption,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
}
