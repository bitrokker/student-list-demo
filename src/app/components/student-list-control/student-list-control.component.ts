import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IStudent } from '../../interfaces';
import { StudentService } from '../../services';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'student-list-control',
  templateUrl: './student-list-control.component.html',
  styleUrls: ['./student-list-control.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe]
})
export class StudentListControlComponent implements OnInit {
  private _currentSelected: string = 'id';
  private _isAscSorted: boolean = true;

  tableData$: Observable<IStudent[]> = new Observable<IStudent[]>();

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.tableData$ = this.studentService.getStudents$();
  }

  /**
   * methode sortiert/toggelt die studenten liste per eigenschaft
   * @param header
   */
  orderStudentListByProperty(header: string): void {
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
   * click event für den tabellen header
   * @param header
   */
  onHeaderClick(header: string): void {
    if(!this._currentSelected || this._currentSelected !== header) {
      this._currentSelected = header;
      this._isAscSorted = false;
    }

    this.orderStudentListByProperty(this._currentSelected);
    this._isAscSorted = !this._isAscSorted;
  }

  /**
   * methode liefert mat arrow als string zurück.
   * @param header
   * @returns
   */
  getArrowByHeader(header: string): string {
    if(this._currentSelected !== header) { return ''; }
    return this._isAscSorted ? 'arrow_upward' : 'arrow_downward';
  }
}
