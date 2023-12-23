import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-courses-details-page',
  templateUrl: './courses-details-page.component.html',
  styleUrls: ['./courses-details-page.component.scss']
})
export class CoursesDetailsPageComponent {
  constructor(public shard: SharedService, public route: ActivatedRoute){}
  itemId: number = 0;
  ngOnInit(){
    this.route.paramMap.subscribe(
      param => this.itemId = Number(param.get('id'))
        )
        this.shard.getCourseById(this.itemId);
  }

  
}
