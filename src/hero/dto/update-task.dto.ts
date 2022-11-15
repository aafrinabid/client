import { IsNotEmpty } from "class-validator";

export class updateTaskStatusDto{
    @IsNotEmpty()
    status:string;

    @IsNotEmpty()
    id: number
}