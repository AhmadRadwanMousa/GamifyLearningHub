import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient ,private spinner: NgxSpinnerService , private toastr : ToastrService) { }

  programs:any = []
  GetAllPrograms(){
      this.spinner.show();
    this.http.get("https://localhost:7036/api/Program/GetAllPrograms").subscribe(
      {
      next : (x)=>{this.programs =x;
      this.spinner.hide()},
      error : (err)=>{console.log(err);
        this.spinner.hide();},
    })

  }


  DeleteProgram(id : number){
    this.spinner.show();
    this.http.delete("https://localhost:7036/api/Program/DeleteProgram/" + id).subscribe(
      {
      next : (x)=>{console.log("Deleted")
      this.GetAllPrograms();
      this.spinner.hide();
    if(x == 1){
        this.toastr.success("Delete Program success");
    } },
      error : (err)=>{console.log("error");
      
        this.toastr.error("Delete Program error");
        this.spinner.hide();
     },
    })

  }

  

  CreateProgram(data :any){
    this.spinner.show();
    this.http.post("https://localhost:7036/api/Program" , data).subscribe(
      {
        next : (x)=>{console.log("Created") 
          this.GetAllPrograms();
          this.spinner.hide();
          if(x != null){
              this.toastr.success("Create Program success");
          }
       },
        error : (err)=>{console.log(err);
          this.toastr.error("Create Program error");
          this.spinner.hide();
        },
      }
    )
  }




  UpdateProgram(data :any){
    this.spinner.show();
    this.http.put("https://localhost:7036/api/Program" , data).subscribe(
      {
        next : (x)=>{console.log("Updated") 
          this.GetAllPrograms();
          this.spinner.hide();
          if(x != null){
              this.toastr.success("Update Program success");
          }
       },
        error : (err)=>{console.log(err);
          this.toastr.error("Update Program error");
          this.spinner.hide();
        },
      }
    )
  }









  plans:any = []
  GetAllPlans(){
      this.spinner.show();
    this.http.get("https://localhost:7036/api/Plan/GetAllPlans").subscribe(
      {
      next : (x)=>{this.plans =x;
      this.spinner.hide()},
      error : (err)=>{console.log(err);
        this.spinner.hide();},
    })

  }


  educationalPeriods:any = []
  GetAllEducationalPeriods(){
      this.spinner.show();
    this.http.get("https://localhost:7036/api/EducationalPeriod/GetAllEducationalPeriod").subscribe(
      {
      next : (x)=>{this.educationalPeriods =x;
      this.spinner.hide()},
      error : (err)=>{console.log(err);
        this.spinner.hide();},
    })

  }










}
