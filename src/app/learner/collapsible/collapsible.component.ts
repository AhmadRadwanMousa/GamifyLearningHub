import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out')),
    ]),
  ],
})
export class CollapsibleComponent {
  @Input() Tilte: any;
  @Input() Content: any = [];
  isChecked: boolean = false;

  constructor(public learnerService: LearnerService) {}
  isCollapsed = true;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ChangeUserProgress(event: any, lectureId: number, sectionId: number) {
    event.target.disabled = true;
    this.learnerService.CreateUserProgress(lectureId, sectionId);
  }
  IsLectureInProgress(lectureId: number): boolean {
    return this.learnerService.UserProgress.some(
      (progress: any) => progress.lectureid === lectureId
    );
  }
}
