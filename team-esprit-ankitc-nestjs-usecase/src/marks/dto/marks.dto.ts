import { IsNumber, IsString, Max, Min } from "class-validator";

export class MarksDto {
    
    @IsNumber()
    @Max(100)
    @Min(0)
    Math: number;

    @IsNumber()
    @Max(100)
    @Min(0)
    Science: number;

    @IsNumber()
    @Max(100)
    @Min(0)
    English: number;

    @IsNumber()
    @Max(100)
    @Min(0)
    ComputerScience: number;

    @IsString()
    student_id : string;

    @IsString()
    exam_id: string

    @IsString()
    class_id:string
}
