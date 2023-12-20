import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }


  //Role Requests

  Role: any=[];

  //Get  Role
  GetAllRoles(){
    this.http.get("https://localhost:7036/api/Role").subscribe
    (
      {
        next:(x)=>{this.Role = x},
        error:(err)=>{console.log(err)}
      }
    )
  }

  //Delete Role
  DeleteRole(id : number)
  {
    this.http.delete("https://localhost:7036/api/Role/"+ id).subscribe(
      {
        next:()=>{console.log("Deleted")
        this.GetAllRoles()},
        error:(err)=>{console.log(err)}
      }
    );
  }

  //Post Role
  CreateRole(data: any)
{
  
  this.http.post("https://localhost:7036/api/Role" , data).subscribe(
    {
      next: ()=>{console.log("Role Created")
    this.GetAllRoles()},
      error: (err) => {console.log(err)}
      }
  )
}

//Put Role
UpdateRole(data : any)
{
  this.http.put("https://localhost:7036/api/Role" , data).subscribe(
    {
      next: ()=>{console.log("Updated");
      this.GetAllRoles()
      },
      error: (err)=>{console.log(err);
      }
    
    }
  )
}


}

  //End Role Requests
