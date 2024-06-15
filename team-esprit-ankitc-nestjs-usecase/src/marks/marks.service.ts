import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/entities/result.enity';
import { CustomError } from 'src/utils/response';
import { Workbook } from 'exceljs';

@Injectable()
export class MarksService {
    constructor(
        @InjectRepository(Result) private resultRepository: Repository<Result>
      ) {}

    async getMarksByStudentId(student_id,subject,exam_id){
        try{
            let marks;
            if(!subject && !exam_id){
                marks=await this.resultRepository.find({where:{student_id:{id:student_id}}});
            }else if(!exam_id){
                marks=await this.resultRepository.find({select:["id",subject],where:{student_id:{id:student_id}}});  
            }else if(!subject){
                marks=await this.resultRepository.find({where:{student_id:{id:student_id}, exam_id:{id:exam_id}}});
            }else{
                
                marks=await this.resultRepository.find({select:["id",subject],where:{student_id:{id:student_id}, exam_id:{id:exam_id}}});
            }
         
            return marks
        }catch(error){
            throw new CustomError(error.status|| 500, error.message);
        }
    }


    async getAllStudentMarks(authenticatedUser, student_id, exam_id){
        try{
        let marks;
        if(authenticatedUser === "TEACHER"){
            if(!student_id && !exam_id){
            marks = this.resultRepository.find({select:{student_id:{id:true},exam_id:{id:true}, class_id:{id:true}},relations:['student_id','exam_id','class_id']})
            }else if(!exam_id){
            marks = await this.resultRepository.find({where:{student_id:{id:student_id}},relations:['student_id','exam_id','class_id']});
        }else if(!student_id){
            marks= await this.resultRepository.find({where:{exam_id:{id:exam_id}},relations:['student_id','exam_id','class_id']})
        }else{
        
            marks=await this.resultRepository.find({where:{student_id:{id:student_id}, exam_id:{id:exam_id}},relations:['student_id','exam_id','class_id']});
        }
        return marks
    }else{
        throw new CustomError(401,"Unauthorized Access"); 
    }
}catch(error){
    console.log(error);
    
    throw new CustomError(error.status || 500, error.message);
    }
}


async addMarks(authenticatedUser, marksDto ){
    try{
        
        if(authenticatedUser === "TEACHER"){
        const data= this.resultRepository.create(marksDto);
         await this.resultRepository.save(data)
        }else{
            throw new CustomError(401,"Unauthorized Access"); 
        }
    }catch(error){
        throw new CustomError(error.status || 500, error.message);
    }

}

async updateMarks(authenticatedUser,marksDto){
    try{
        if(authenticatedUser === "TEACHER"){
        const data= await this.resultRepository.find({where:{student_id:{id:marksDto.student_id}, exam_id:{id:marksDto.exam_id}}})
            const resultId=data[0]['id']
            await this.resultRepository.save({id:resultId, ...marksDto})
        }else{
            throw new CustomError(401,"Unauthorozed access")
        }

    }catch(error){
        throw new CustomError(error.status || 500, error.message);
            
    }

}



    async downloadDetailsInExcel(authenticatedUser){
        try{
            let data;
        if(authenticatedUser === "TEACHER"){
            data = await this.resultRepository.find({select:{student_id:{id:true},exam_id:{id:true}, 
                class_id:{id:true}},
                relations:['student_id','exam_id','class_id']})
            
        }else{
            data = await this.resultRepository.find({select:{student_id:{id:true},exam_id:{id:true}, class_id:{id:true}},
                where:{student_id:{id:authenticatedUser}},
                relations:['student_id','exam_id','class_id']})

        }
            
        
         
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('data');
        worksheet.addRow(['id', 'Math', 'Science', 'English', 'ComputerScience', 'student_id', 'exam_id', 'class_id'])

          data.forEach(mark => {
            worksheet.addRow([mark.id,mark.Math,mark.Science, mark.English, mark.ComputerScience, mark.student_id,mark.exam_id, mark.class_id])
          })

          const buffer = await workbook.xlsx.writeBuffer();
            return Buffer.from(buffer);
        } catch (error) {
            throw new CustomError(error.status || 500, error.message);
        }
    }



    async addManyMarks(authenticatedUser,data){
        try{
            let result=[]
            let insertedData;
        if(authenticatedUser !== "TEACHER"){
            return new CustomError(403,"Unauthorize access")
        }

        data.forEach((row)=>{
            insertedData=this.resultRepository.create(row)
            this.resultRepository.save(insertedData)
            result.push(insertedData)
        })

        return result
    }catch(error){
        throw new CustomError(error.status || 500, error.message);
    }

    }

}
