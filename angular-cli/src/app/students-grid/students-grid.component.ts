import { StudentService } from '../services/student.service';
import { IStudentInfo, AVAILABLE_COURSES, AVAILABLE_FEES_PAID_OPTIONS } from '../model/student';
import { GridOptions } from "ag-grid/main";
import { Compiler, OnInit, Component, Injector, TemplateRef, ViewChild, NgModuleRef } from '@angular/core';
import { overlayConfigFactory } from "ngx-modialog";
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import {STUDENT_GRID_COLUMNS} from '../model/student-column-definitions';

@Component({
    providers: [StudentService],
    selector: 'students-grid',
    templateUrl: './students-grid.component.html',
    styleUrls: ['./students-grid.component.css']
})

export class StudentsGridComponent implements OnInit {
    gridOptions: GridOptions;
    columnDefs: any[]
    rowData: IStudentInfo[];
    @ViewChild('templateRef') public templateRef: TemplateRef<any>;

    private latestRowIndex: number = -1;
    constructor(private studentService: StudentService, public modal: Modal, private compiler: Compiler, private injector: Injector) {
        this.gridOptions = <GridOptions>{};
    }

    ngOnInit() {
        this.columnDefs = STUDENT_GRID_COLUMNS;
        this.studentService.getStudents().then((studentsList: IStudentInfo[]) => {
            this.rowData = studentsList;
        });

    }

    private getIdForNewStudent(): string {
        if (this.latestRowIndex === -1) {
            let currentIds: number[] = this.rowData.map(item => Number(item.id.split('student-')[1]));
            this.latestRowIndex = currentIds.sort()[currentIds.length - 1] + 1;
        } else {
            this.latestRowIndex++;
        }

        return `student-${this.latestRowIndex}`;
    }

    //Called on click of the grid row
    public onRowClicked(e) {
        if (e.event.target !== undefined) {
            let data:IStudentInfo = e.data;
            let actionType: string = e.event.target.getAttribute("data-action-type");

            switch(actionType) {
                case "update":
                    return this.updateStudentInfo(data);
                case "remove":
                    return this.removeStudentFromGrid(data);
            }
        }
    }

    public onGridReady(params) {
        params.api.sizeColumnsToFit();
    }
    
    openStudentEditor(studentInfo): Promise<IStudentInfo> {
        return new Promise<IStudentInfo>((resolve, reject) => {
            studentInfo.feesPaidOptions = AVAILABLE_FEES_PAID_OPTIONS;
            studentInfo.courses = AVAILABLE_COURSES;
            
            let dialogRef = this.modal
                .open(this.templateRef, overlayConfigFactory({ studentInfo: studentInfo }, BSModalContext));
            dialogRef
                .then(dialogRef => {
                    dialogRef.result.then((studentInfo: IStudentInfo) => {
                        resolve(studentInfo);
                });
            });
        });
       
    }

    //add new student to the grid
    public addNewStudent() {
        let newStudentIndo = {
            id: null,
            course: AVAILABLE_COURSES[0],
            feesPaid: AVAILABLE_FEES_PAID_OPTIONS[0]
        };
        this.openStudentEditor(newStudentIndo).then((studentInfo: IStudentInfo) => {
            //get Id for the new student
            studentInfo.id = this.getIdForNewStudent();
            this.rowData.push(studentInfo);
            this.gridOptions.api.updateRowData({ add: [studentInfo] });
        });
        
    }
    
    //Update Existing Student info
    public updateStudentInfo(studentInfo: IStudentInfo) {
        this.openStudentEditor(studentInfo).then((studentInfo: IStudentInfo) => {
             this.gridOptions.api.updateRowData({update: [studentInfo]});
        });
    }

    //remove selected student from the row
    public removeStudentFromGrid(studentInfo: IStudentInfo) {   
        this.gridOptions.api.updateRowData({remove: [studentInfo]});
    }

}

