import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-instructor-details-page',
  templateUrl: './instructor-details-page.component.html',
  styleUrls: ['./instructor-details-page.component.scss']
})
export class InstructorDetailsPageComponent {

  constructor(public shard: SharedService , private route:ActivatedRoute ){}

itemId:number=0;

ngOnInit() {
  this.route.paramMap.subscribe((param) => {
    this.itemId = Number(param.get('id'));
    console.log(this.itemId); 
    this.shard.getInstructorDetails(this.itemId);
    this.shard.getAllSectionDetails(this.itemId);
  });
}

  
}
