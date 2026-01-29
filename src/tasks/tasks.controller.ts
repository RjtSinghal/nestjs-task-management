import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        // if filter is provided, implement filtering logic here in future
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        }
        // else call getalltasks
        else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task | undefined {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): boolean {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task | undefined {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
