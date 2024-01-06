import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-mark-exam',
  templateUrl: './mark-exam.component.html',
  styleUrls: ['./mark-exam.component.scss']
})
export class MarkExamComponent {
  constructor(private route: ActivatedRoute ,
    public _learnerService: LearnerService) { }
  id: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params?.['examid'];

      this._learnerService.GetExamDetailsByUserId(this.id);
    });
  }

}
