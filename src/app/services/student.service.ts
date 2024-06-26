import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import { IStudent } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private students: IStudent[] = [{
        id: 1,
        firstName: "Olivia",
        lastName: "Stone",
        university: "Princeton",
        city: "Princeton",
        country: "NJ"
    },
    {
        id: 2,
        firstName: "James",
        lastName: "Baker",
        university: "Harvard",
        city: "Cambridge",
        country: "MA"
    },
    {
        id: 3,
        firstName: "Mia",
        lastName: "Jackson",
        university: "Stanford",
        city: "Stanford",
        country: "CA"
    },
    {
        id: 4,
        firstName: "Jack",
        lastName: "Harper",
        university: "Yale",
        city: "New Haven",
        country: "CT"
    }];

    /**
     * Dienst liefert alle Studenten aus "Fake" Datenbank zurück.
     * @returns
     */
    getStudents$(): Observable<Array<IStudent>> {
        return of(this.students);
    }
}
