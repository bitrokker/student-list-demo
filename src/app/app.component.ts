import { Component } from '@angular/core';
import { StudentListControlComponent } from './components/student-list-control/student-list-control.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [StudentListControlComponent]
})
export class AppComponent { }
