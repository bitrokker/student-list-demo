import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { IStudent } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student-list-control',
  templateUrl: './student-list-control.component.html',
  styleUrls: ['./student-list-control.component.scss']
})
export class StudentListControlComponent implements OnInit, OnDestroy {
    // PRIVATES  
    private _currentSelected: string = "";

    // PUBLICS
    public isAscSorted: boolean = false;
    public tableData$: Observable<Array<IStudent>> = new Observable<Array<IStudent>>();

    constructor(
        private studentService: StudentService
    ) { }

    ngOnDestroy(): void { }

    ngOnInit(): void { 
        this.tableData$ = this.studentService.getStudents$();
    }   

    /**
     * methode sortiert/toggelt die studenten liste per eigenschaft
     * @param property 
     */ 
    public orderStudentListByPropery(property: string): void {
        type T = keyof IStudent;

        this.tableData$ = this.tableData$.pipe(map((data: Array<IStudent>) => {
            if(this.isAscSorted) {
                data.sort((a, b) => (a[<T>property] < b[<T>property]) ? -1 : ((b[<T>property] > a[<T>property]) ? 1 : 0));              
            } else {
                data.sort((a, b) => (a[<T>property] > b[<T>property]) ? -1 : ((b[<T>property] < a[<T>property]) ? 1 : 0));               
            }           
            
            return data;
        }));        
    }

    // EVENTS

    /**
     * onclick event für 
     * @param property 
     */
    public onHeaderClick(property: string): void {
        if(!this._currentSelected || this._currentSelected !== property) {
            this._currentSelected = property;
            this.isAscSorted = false;
        }

        this.orderStudentListByPropery(this._currentSelected); 
        this.isAscSorted = this.isAscSorted ? false : true;     
    }    
}