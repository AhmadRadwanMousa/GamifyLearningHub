import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs : any =[

  ]
  constructor(private http: HttpClient ){
  
  }
  
  ngOnInit() {
    this.GetAllCategories();
  }
  
  GetAllCategories(){
  this.http.get('https://localhost:7036/api/Program/GetAllPrograms').subscribe((result : any)=>
  {
    this.programs = result;
  } , err => { alert('Error'); }
  );
  }
}
