import { Injectable } from '@angular/core';
import {IStudentInfo} from '../model/student';
import {STUDENTS_LIST} from '../model/mock-students';

@Injectable()
export class StudentService {

  constructor() { }

  public getStudents(): Promise<IStudentInfo[]> {
    
    //  return new Promise(resolve => {
    //   setTimeout(() => resolve(STUDENTS_LIST), 2000);
    // });
    return Promise.resolve(STUDENTS_LIST);
  }
}
