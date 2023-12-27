import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-instructor-paje',
  templateUrl: './instructor-paje.component.html',
  styleUrls: ['./instructor-paje.component.scss']
})
export class InstructorPajeComponent implements OnInit {

 
  constructor(public shard: SharedService ,private spinner: NgxSpinnerService , private toastr : ToastrService ,private route:Router){}


  ngOnInit() {
    this.toastr.success('welcome');
     this.shard.getAllInstrutors();
    }

   
    GoToInstructor(id:number){

      this.route.navigate(['pages/instructorDetails',id])
    }

    


}
