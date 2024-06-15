import { Body, Controller, Get, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MarksService } from './marks.service';
import { Response, request, response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { MarksDto } from './dto/marks.dto';
import { CustomError, CustomResponse } from 'src/utils/response';
import * as xlsx from 'xlsx'
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';


@Controller('users')
export class MarksController {
    constructor(private readonly markService: MarksService
        ) {}

    @Get('marks')
    @UseGuards(AuthGuard)
    async getMarksByStudentId(@Body() body:{subject : string , exam_id: string}, @Req() request )  {
    const authenticatedUser=request["id"]
     
    const returnedData = await this.markService.getMarksByStudentId(authenticatedUser ,body.subject, body.exam_id);
    
    return new CustomResponse(200, {message:'data fetched', data:returnedData})
   }

   @Get('marks/getall')
    @UseGuards(AuthGuard)
   async getAllStudentMarks(@Body() body:{student_id : string , exam_id: string}, @Req() request){
    const authenticatedUser=request["role"]
    //console.log(authenticatedUser);
    
    const returnedData = await this.markService.getAllStudentMarks(authenticatedUser ,body.student_id, body.exam_id);
    return new CustomResponse(200, {message:'data fetched', data:returnedData})
   }


   @Post('marks/insert')
   @UseGuards(AuthGuard)
   async addMarks(@Body() marksDto:MarksDto,  @Req() request){
    const authenticatedUser=request["role"]
    const returnedData = await this.markService.addMarks(authenticatedUser ,marksDto);
    return new CustomResponse(200, {message:'data added', data:returnedData})
   }


   @Patch('marks/update')
   @UseGuards(AuthGuard)
   async updateMarks(@Body() marksDto:MarksDto, @Req() request){
        const authenticatedUser = request["role"]
        const returnedData=await this.markService.updateMarks(authenticatedUser,marksDto)
        return new CustomResponse(200, {message:'data updated', data:returnedData})
   }


   @Get('marks/download')
   @UseGuards(AuthGuard)
   async downloadDetailsInExcelForStudent( @Req() request, @Res() response){
    const authenticatedUser = request["id"]
    const returnedData= await  this.markService.downloadDetailsInExcel(authenticatedUser);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader('Content-Disposition', 'attachment; filename=student_marks.xlsx');
    response.send(returnedData);
   }


   @Get('marks/download/teacher')
   @UseGuards(AuthGuard)
   async downloadDetailsInExcelForTeacher( @Req() request, @Res() response){
    const authenticatedUser = request["role"]
    const returnedData= await  this.markService.downloadDetailsInExcel(authenticatedUser);
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader('Content-Disposition', 'attachment; filename=class_marks.xlsx');
    response.send(returnedData);
   }



   @Post('marks/insertmany')
   @UseInterceptors(FileInterceptor('file'))
   @UseGuards(AuthGuard)
   async addManyMarks(@UploadedFile() file:Express.Multer.File, @Req() request){
    const authenticatedUser = request["role"]
    
    const workbook = xlsx.readFile(file.path);
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const excelData = xlsx.utils.sheet_to_json(sheet,{rawNumbers:true})
    
    const insertedData = excelData.map((item)=> plainToClass(MarksDto,item))
    const errors = await Promise.all(insertedData.map((item)=>validate(item)))
    const valueErrors = errors.flatMap((error)=>error)

    if(valueErrors.length>0){
        return new CustomResponse(400, {message:"validation error", data:[]})
    }
    
    const data=await this.markService.addManyMarks(authenticatedUser,excelData)

    return new CustomResponse(200, {message:"Data inserted", data:data})
   }
}
