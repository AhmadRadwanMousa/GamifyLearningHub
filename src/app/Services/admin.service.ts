import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  Role: any = [];

  //Get  Role
  GetAllRoles() {
    this.http.get('https://localhost:7036/api/Role').subscribe({
      next: (x) => {
        this.Role = x;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Delete Role
  DeleteRole(id: number) {
    this.http.delete('https://localhost:7036/api/Role/' + id).subscribe({
      next: () => {
        console.log('Deleted');
        this.GetAllRoles();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Post Role
  CreateRole(data: any) {
    this.http.post('https://localhost:7036/api/Role', data).subscribe({
      next: () => {
        console.log('Role Created');
        this.GetAllRoles();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Put Role
  UpdateRole(data: any) {
    this.http.put('https://localhost:7036/api/Role', data).subscribe({
      next: () => {
        console.log('Updated');
        this.GetAllRoles();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  programs: any = [];
  filePath: string = '';
  GetAllPrograms() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Program/GetAllPrograms')
      .subscribe({
        next: (x) => {
          this.spinner.hide();
          this.programs = x;
          console.log(x);
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

  GetCoursesSequenceByProgramId(id: number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/CourseSequence/GetByProgramId/' + id)
      .subscribe({
        next: (x: any) => {
          this.courseSequence = x.sort(
            (a: any, b: any) =>
              (new Date(a.startdate) as any) - (new Date(b.startdate) as any)
          );
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
    this.http
      .post('https://localhost:7036/api/CourseSequence', data)
      .subscribe({
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

  DeleteCoursesSequence(id: number, programid: number) {
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/CourseSequence/' + id)
      .subscribe({
        next: (x: any) => {
          console.log('Deleted');
          this.GetCoursesSequenceByProgramId(programid);
          this.spinner.hide();
          if (x.rowsAffected == 1) {
            this.toastr.success('Delete Courses Sequence success');
          } else {
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

  UpdateCourseSequence(data: any, programid: number) {
    this.spinner.show();
    this.http.put('https://localhost:7036/api/CourseSequence', data).subscribe({
      next: (x: any) => {
        console.log('Updated');
        this.GetCoursesSequenceByProgramId(programid);
        this.spinner.hide();
        if (x.rowsAffected == 1) {
          this.toastr.success('Update Course Sequence');
        } else {
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
    debugger;
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

  // UserSection functionality =>
  sections: any = [];
  students: any = [];
  filterdStudents: any = [];
  getSectionByCourseId(id: number) {
    this.http.get(`${URL}/Section/GetSectionByCourseId/` + id).subscribe({
      next: (res) => {
        this.spinner.show();
        this.sections = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  getAllStudents() {
    this.http.get(`${URL}/UserSection/GetAllStudentsUsers`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.students = res;
        this.filterdStudents = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  createUserSection(data: any) {
    this.http.post(`${URL}/UserSection`, data).subscribe({
      next: () => {
        this.toastr.success('Student Added to section');
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  Users: any;
  GetAllUsers() {
    this.spinner.show();
    this.http.get(`${URL}/User`).subscribe(
      (res) => {
        this.Users = res;
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('Something went wrong!', error.message);
        this.spinner.hide();
      }
    );
  }
  CreateUser(newUser: any) {
    this.spinner.show();
    this.http.post(`${URL}/User`, newUser).subscribe(
      (res: any) => {
        if (!isNaN(res)) {
          this.toastr.success('User has been created', 'Success Notification');
          this.GetAllUsers();
        }
      },
      (e) => {
        this.toastr.error(e.message, 'Something Went Wrong');
      }
    );
    this.spinner.hide();
  }
  DeleteUser(id: number) {
    this.spinner.show();
    this.http.delete(`${URL}/User/` + id).subscribe(
      (res: any) => {
        if (!isNaN(res)) {
          this.toastr.success('User has been Deleted', 'Success Notification');
          this.GetAllUsers();
          this.spinner.hide();
        }
      },
      (error) => {
        this.toastr.error(error.message);
        this.spinner.hide();
      }
    );
  }
  UpdateUser(user: any) {
    this.spinner.show();
    this.http.put(`${URL}/User`, user).subscribe(
      (res: any) => {
        if (!isNaN(res)) {
          this.toastr.success('User has been updated', 'Success Notification');
          this.GetAllUsers();
        }
      },
      (e) => {
        this.toastr.error(e.message, 'Something Went Wrong');
      }
    );
    this.spinner.hide();
  }
}
