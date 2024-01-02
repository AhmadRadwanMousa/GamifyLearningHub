import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-announcements',
  templateUrl: './section-announcements.component.html',
  styleUrls: ['./section-announcements.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out')),
    ]),
  ],
})
export class SectionAnnouncementsComponent {
  @Input() Content: any = [];
  isCollapsed = true;
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
