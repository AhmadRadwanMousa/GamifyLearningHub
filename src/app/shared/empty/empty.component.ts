import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent {
  @Input() imageSrc: string = '';
  @Input() message: string = '';
  @Input() width: string = '100';
  @Input() height: string = '100';
}
