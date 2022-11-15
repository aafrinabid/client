import { Body, Controller, Delete, Get, OnModuleInit, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcClientOptions } from 'src/grpc-hero.options';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskStatusDto } from './dto/update-task.dto';
import { Hero } from './interfaces/hero.interface';



interface TaskService {
    findOne(data: { id: number }): Observable<any>;
    getAllTasks(id:number): Observable<any>;
    createTask(createTaskDto:createTaskDto): Observable<any>
    updateTaskStatus(updateTaskStatusDto: updateTaskStatusDto) : Observable<any>
    deleteTask (id:number) :Observable<any>
  }


@Controller('task')
export class HeroController implements OnModuleInit {
    @Client(grpcClientOptions) private readonly client: ClientGrpc ;
    private heroService: TaskService;

    onModuleInit(){
        this.heroService = this.client.getService<TaskService>('TaskService');

    }


    @Get()
    getAllTasks(@Body('id') id :number):Observable<any>{
        let items = this.heroService.getAllTasks(id)
        return items
    }



    @Get(':id')
    call(@Param() params):Observable<any> {
        return this.heroService.findOne(params)
    }

    @Post()
    createTask(@Body() createTaskDto:createTaskDto) {
        return this.heroService.createTask(createTaskDto)
    }

    @Patch()
    updateTaskStatus(@Body() updateTaskStatusDto:updateTaskStatusDto) {
        return this.heroService.updateTaskStatus(updateTaskStatusDto)
    }

    @Delete()
    deleteTask(@Body() data) {
        console.log(data)
        return this.heroService.deleteTask(data)

    }


}
