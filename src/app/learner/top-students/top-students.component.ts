import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss']
})
export class TopStudentsComponent {
@Input() isShow: boolean = true;
}
