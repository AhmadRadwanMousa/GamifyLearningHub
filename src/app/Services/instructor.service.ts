import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  userId : any = 0 ;

  constructor(   private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
      let token :any =   localStorage.getItem('token');
      const tokenPayload: any = jwtDecode(token);
       this.userId = Number(tokenPayload.userId);
   }

 ngOnInit(){

 }


 sectionsByUserId: any = [];

 GetSectionsByUserId() {
   this.spinner.show();
   this.http
     .get('https://localhost:7036/api/Section/GetAllSectionsByUserId/' + this.userId)
     .subscribe({
       next: (section: any) => {
         this.sectionsByUserId = section;

         this.spinner.hide();
       },
       error: (err) => {
         console.log(err);
         this.spinner.hide();
       },
     });
 }



 allMaterialsBySectionId: any = [];

 GetAllMaterialsBySectionId(sectionId : number) {
   this.spinner.show();
   this.http
     .get('https://localhost:7036/api/CourseSection/GetCoursesSectionBySectionId/' + sectionId)
     .subscribe({
       next: (material: any) => {
         this.allMaterialsBySectionId = material;
         console.log( material )
         this.spinner.hide();
       },
       error: (err) => {
         console.log(err);
         this.spinner.hide();
       },
     });
 }


 CreateCourseSection(data: any) {
  this.spinner.show();
  this.http.post('https://localhost:7036/api/CourseSection', data).subscribe({
    next: () => {
      console.log('Course Section Created');
      this.GetSectionsByUserId() ;
      this.GetAllMaterialsBySectionId(data.sectionid)
            this.spinner.hide();
      this.toastr.success('Course Section created successfully');
    },
    error: (err) => {
      console.log(err);
      this.spinner.hide();
      this.toastr.error('Failed to create Course Section');
    },
  });
}


UpdateCourseSection(data: any) {
  this.spinner.show();
  this.http.put('https://localhost:7036/api/CourseSection/' + data.coursesectionid, data).subscribe({
    next: () => {
      console.log('Course Section Updated');
      this.GetSectionsByUserId() ;
      this.GetAllMaterialsBySectionId(data.sectionid)
            this.spinner.hide();
      this.toastr.success('Course Section updated successfully');
    },
    error: (err) => {
      console.log(err);
      this.spinner.hide();
      this.toastr.error('Failed to update Course Section');
    },
  });
}


DeleteCourseSection(id: number , sectionid :number ) {
  console.log(id)
  this.spinner.show();
  this.http
    .delete('https://localhost:7036/api/CourseSection/' + id)
    .subscribe({
      next: (x : any) => {
        console.log('Deleted');
        this.GetSectionsByUserId() ;
        this.GetAllMaterialsBySectionId(sectionid)
        this.spinner.hide();
        if (x.affectedRows == 1) {
          this.toastr.success('Delete Course Section success');
        }
      },
      error: (err) => {
        console.log('error');

        this.toastr.error('Delete Course Section error');
        this.spinner.hide();
      },
    });
}



UploadFiles(file: FormData) {
  return this.http.post('https://localhost:7036/api/Upload/UploadFile', file).pipe(
    map((res: any) => {
      if (res) {
        this.toastr.info('File has been created!', '', {
          easeTime: 300,
          easing: 'ease-in-out',
        });
        return res.path;
      }
      return '';
    })
  );
}


CreateLecture(data: any , sectionid : number) {
  console.log(data)
  this.spinner.show();
  this.http.post('https://localhost:7036/api/Lecture', data).subscribe({
    next: () => {
      console.log('Lecture Created');
      this.GetSectionsByUserId() ;
      this.GetAllMaterialsBySectionId(sectionid)
            this.spinner.hide();
      this.toastr.success('Course Section created successfully');
    },
    error: (err) => {
      console.log(err);
      this.spinner.hide();
      this.toastr.error('Failed to create Course Section');
    },
  });
}


DeleteLecture(id: number , sectionid :number ) {
  console.log(id)
  this.spinner.show();
  this.http
    .delete('https://localhost:7036/api/Lecture/' + id)
    .subscribe({
      next: (x : any) => {
        console.log('Deleted');
        this.GetSectionsByUserId() ;
        this.GetAllMaterialsBySectionId(sectionid)
        this.spinner.hide();
        if (x.affectedRows == 1) {
          this.toastr.success('Delete lectureId success');
        }
      },
      error: (err) => {
        console.log('error');

        this.toastr.error('Delete lectureId error');
        this.spinner.hide();
      },
    });
}

UpdateLecture(data: any , sectionid :number) {
  console.log(data)
  this.spinner.show();
  this.http.put('https://localhost:7036/api/Lecture/' + data.lectureid, data).subscribe({
    next: () => {
      console.log('Lecture Updated');
      this.GetSectionsByUserId() ;
      this.GetAllMaterialsBySectionId(sectionid)
            this.spinner.hide();
      this.toastr.success('Lecture updated successfully');
    },
    error: (err) => {
      console.log(err);
      this.spinner.hide();
      this.toastr.error('Failed to update Lecture');
    },
  });
}



}


