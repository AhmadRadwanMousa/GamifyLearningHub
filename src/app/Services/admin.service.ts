import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  programs: any = [];
  filePath: string = '';
  GetAllPrograms() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Program/GetAllPrograms')
      .subscribe({
        next: (x) => {
          this.programs = x;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }




  DeleteProgram(id: number) {
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/Program/DeleteProgram/' + id)
      .subscribe({
        next: (x) => {
          console.log('Deleted');
          this.GetAllPrograms();
          this.spinner.hide();
          if (x == 1) {
            this.toastr.success('Delete Program success');
          }
        },
        error: (err) => {
          console.log('error');

          this.toastr.error('Delete Program error');
          this.spinner.hide();
        },
      });
  }

  CreateProgram(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Program', data).subscribe({
      next: (x) => {
        console.log('Created');
        this.GetAllPrograms();
        this.spinner.hide();
        if (x != null) {
          this.toastr.success('Create Program success');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Create Program error');
        this.spinner.hide();
      },
    });
  }

  UpdateProgram(data: any) {
    this.spinner.show();
    this.http.put('https://localhost:7036/api/Program', data).subscribe({
      next: (x) => {
        console.log('Updated');
        this.GetAllPrograms();
        this.spinner.hide();
        if (x != null) {
          this.toastr.success('Update Program success');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Update Program error');
        this.spinner.hide();
      },
    });
  }



  courseSequence: any = [];

  GetCoursesSequenceByProgramId(id : number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/CourseSequence/GetByProgramId/'+ id)
      .subscribe({
        next: (x :any) => {
          this.courseSequence = x.sort((a: any, b: any) => (new Date(a.startdate) as any) - (new Date(b.startdate) as any));
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }



  CreateCoursesSequence(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/CourseSequence', data).subscribe({
      next: (x) => {
        console.log('Created');
        this.GetCoursesSequenceByProgramId(data.programid);
        this.spinner.hide();
        if (x != null) {
          this.toastr.success('Create Courses Sequence success');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Create Courses Sequence error');
        this.spinner.hide();
      },
    });
  }



  DeleteCoursesSequence(id: number , programid :number) {
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/CourseSequence/' + id)
      .subscribe({
        next: (x : any) => {
          console.log('Deleted');
          this.GetCoursesSequenceByProgramId(programid);
          this.spinner.hide();
            if (x.rowsAffected == 1) {
            this.toastr.success('Delete Courses Sequence success');        
          }
          else {
            this.toastr.error('Delete Courses Sequence error');
          }
        },
        error: (err) => {
          console.log('error');

          this.toastr.error('Delete Courses Sequence error');
          this.spinner.hide();
        },
      });
  }

  UpdateCourseSequence(data: any , programid : number) {
    this.spinner.show();
    this.http.put('https://localhost:7036/api/CourseSequence', data).subscribe({
      next: (x :any) => {
        console.log('Updated');
        this.GetCoursesSequenceByProgramId(programid);
        this.spinner.hide();
        if (x.rowsAffected == 1) {
          this.toastr.success('Update Course Sequence');   
        }
        else {
          this.toastr.error('Update Course Sequence error');
        }
       
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Update Course Sequence error');
        this.spinner.hide();
      },
    });
  }



  plans: any = [];
  GetAllPlans_duplicate() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/Plan/GetAllPlans').subscribe({
      next: (x) => {
        this.plans = x;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  educationalPeriods: any = [];
  GetAllEducationalPeriods() {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/EducationalPeriod/GetAllEducationalPeriod'
      )
      .subscribe({
        next: (x) => {
          this.educationalPeriods = x;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }
  GetAllPlans() {
    return this.http.get(`${URL}/plan/GetAllplans`);
  }
  DeletePlan(id: number) {
    return this.http.delete(`${URL}/plan/` + id);
  }
  UploadFile(file: FormData) {
    return this.http.post(`${URL}/Upload/UploadImage`, file).pipe(
      map((res: any) => {
        if (res) {
          this.toastr.info('Image has been created!', '', {
            easeTime: 300,
            easing: 'ease-in-out',
          });
          return res.path;
        }
        return '';
      })
    );
  }




  UploadFiles(file: FormData) {
    return this.http.post(`${URL}/Upload/UploadFile`, file).pipe(
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


  CreatePlan(newPlan: any) {
    return this.http.post(`${URL}/plan/CreatePlan`, newPlan);
  }
  UpdatePlan(plan: any) {
    return this.http.put(`${URL}/plan/UpdatePlan`, plan);
  }

  //EducationPeriod

  GetAllEducationalPeriod() {
    return this.http.get(`${URL}/EducationalPeriod/GetAllEducationalPeriod`);
  }
  DeleteEducationalPeriod(id: number) {
    return this.http.delete(`${URL}/EducationalPeriod/${id}`);
  }
  CreateEducationalPeriod(newEducationalPeriod: any) {
    return this.http.post(
      `${URL}/EducationalPeriod/CreateEducationalperiod`,
      newEducationalPeriod
    );
  }
  UpdateEducationalPeriod(educationalPeriod: any) {
    return this.http.put(
      `${URL}/EducationalPeriod/UpdateEducationalperiod`,
      educationalPeriod
    );
  }
  courses: any = [];
  getAllCourses() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/Course').subscribe({
      next: (result) => {
        this.courses = result;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  postCourse(data: any) {
    this.http.post('https://localhost:7036/api/Course/', data).subscribe({
      next: () => {
        console.log('Created');
        this.toastr.success('Course Created');
        this.getAllCourses();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Course Create Faild');
      },
    });
  }

  deleteCourse(id: number): any {
    this.http.delete('https://localhost:7036/api/Course/' + id).subscribe({
      next: (res) => {
        this.getAllCourses();
        this.toastr.success('Course Deleted');
        return res;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Course Delete Faild');
      },
    });
  }

  updateCourse(data: any) {
    //debugger
    this.http.put('https://localhost:7036/api/Course/', data).subscribe({
      next: (res) => {
        this.getAllCourses();
        this.toastr.success('Course Updated');
        return res;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Course Update Faild');
      },
    });
  }
}
