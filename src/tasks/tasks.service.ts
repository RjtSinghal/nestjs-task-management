import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status == status);
        }

        if (search) {
            tasks = tasks.filter(
                (task) =>
                    task.title.includes(search) ||
                    task.description.includes(search),
            );
        }
        return tasks;
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): boolean {
        const index: number = this.tasks.findIndex((task) => task.id === id);
        if (index >= 0) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
        const task = this.getTaskById(id);
        if (task) task.status = status;
        return task;
    }
}
