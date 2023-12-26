import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-attendence-section-users',
  templateUrl: './attendence-section-users.component.html',
  styleUrls: ['./attendence-section-users.component.scss']
})
export class AttendenceSectionUsersComponent {

  constructor(public shard: InstructorService , private route:ActivatedRoute ){}

  itemId:number=0;

ngOnInit() {
  this.route.paramMap.subscribe((param) => {
    this.itemId = Number(param.get('id'));
    console.log(this.itemId); 
    this.shard.getAllUsersSection(this.itemId);
    
  });
}
}
