import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { IStudent } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student-list-control',
  templateUrl: './student-list-control.component.html',
  styleUrls: ['./student-list-control.component.scss']
})
export class StudentListControlComponent implements OnInit {
    // PRIVATES  
    private _currentSelected: string = 'id';
    private _isAscSorted: boolean = true;

    // PUBLICS    
    public tableData$: Observable<Array<IStudent>> = new Observable<Array<IStudent>>();

    constructor(
        private studentService: StudentService
    ) { }

    ngOnInit(): void { 
        this.tableData$ = this.studentService.getStudents$();
    }   

    /**
     * methode sortiert/toggelt die studenten liste per eigenschaft
     * @param property 
     */ 
    public orderStudentListByPropery(header: string): void {
        type T = keyof IStudent;

        this.tableData$ = this.tableData$.pipe(map((data: Array<IStudent>) => {
            if(this._isAscSorted) {
                data.sort((a, b) => (a[<T>header] < b[<T>header]) ? -1 : ((b[<T>header] > a[<T>header]) ? 1 : 0));              
            } else {
                data.sort((a, b) => (a[<T>header] > b[<T>header]) ? -1 : ((b[<T>header] < a[<T>header]) ? 1 : 0));               
            }
            
            return data;
        }));        
    }

    // EVENTS

    /**
     * onclick event für den tabellen header
     * @param header 
     */
    public onHeaderClick(header: string): void {
        if(!this._currentSelected || this._currentSelected !== header) {
            this._currentSelected = header;
            this._isAscSorted = false;
        }

        this.orderStudentListByPropery(this._currentSelected); 
        this._isAscSorted = this._isAscSorted ? false : true;     
    } 
    
    /**
     * methode liefert mat arrow als string zurück.
     * @param header 
     * @returns 
     */
    public getArrowByHeader(header: string): string {
        if(this._currentSelected !== header) { return ''; }
        return this._isAscSorted ? 'arrow_upward' : 'arrow_downward';
    }
}