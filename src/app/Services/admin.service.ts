import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { UrlHandlingStrategy } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

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

  //Get Role
  GetAllRoles() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/Role').subscribe({
      next: (x) => {
        this.Role = x;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to retrieve roles');
      },
    });
  }

  //Delete Role
  DeleteRole(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:7036/api/Role/' + id).subscribe({
      next: () => {
        this.GetAllRoles();
        this.spinner.hide();
        this.toastr.success('Role deleted successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to delete role');
      },
    });
  }

  //Post Role
  CreateRole(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Role', data).subscribe({
      next: () => {
        this.GetAllRoles();
        this.spinner.hide();
        this.toastr.success('Role created successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to create role');
      },
    });
  }

  //Put Role
  UpdateRole(data: any) {
    this.spinner.show();
    this.http.put('https://localhost:7036/api/Role', data).subscribe({
      next: () => {
        this.GetAllRoles();
        this.spinner.hide();
        this.toastr.success('Role updated successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to update role');
      },
    });
  }

  //Section

  sections: any = [];
  instructorSection: any = [];

  //  get sections
  getAllSections() {
    this.spinner.show();
    this.http.get<any[]>('https://localhost:7036/api/Section').subscribe({
      next: (result) => {
        this.sections = result.map((section: any) => {
          // Access to get (user-name) in section  >  users
          const userFirstName = section.user?.firsname || 'Unknown';
          const userLastName = section.user?.lastname || 'Unknown';

          return {
            ...section,
            userFirstName,
            userLastName,
          };
        });

        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to retrieve sections');
      },
    });
  }

  // Delete section
  DeleteSection(id: number, coursesequenceid: number) {
    this.spinner.show();
    this.http.delete('https://localhost:7036/api/Section/' + id).subscribe({
      next: () => {
        this.getAllSections();
        this.spinner.hide();
        this.GetSectionsByCoursesSequence(coursesequenceid);

        this.toastr.success('Section deleted successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to delete section');
      },
    });
  }

  //Post Section
  CreateSection(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Section', data).subscribe({
      next: () => {
        this.GetSectionsByCoursesSequence(data.coursesequenceid);
        this.spinner.hide();
        this.toastr.success('Section created successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to create Section');
      },
    });
  }

  sectionsByCoursesSequence: any = [];

  GetSectionsByCoursesSequence(id: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/Section/GetAllSectionsByCourseSequenceId/' +
          id
      )
      .subscribe({
        next: (section: any) => {
          this.sectionsByCoursesSequence = section;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  //get (Users With RoleId2)  in  (post section)

  getAllUsersWithRoleId2(): Observable<any[]> {
    const url = 'https://localhost:7036/api/Section/GetAllUsersWithRoleId2';
    // Update the method to store the list of users
    return this.http.get<any[]>(url).pipe(
      map((users) => {
        this.instructorSection = users;
        return users;
      })
    );
  }

  //put Section

  UpdateSection(data: any) {
    const sectionId = data.sectionid; // Assuming your data object has the 'sectionid' property

    this.http
      .put(`https://localhost:7036/api/Section/${sectionId}`, data)
      .subscribe({
        next: () => {
          this.getAllSections();
          this.spinner.hide();
          this.GetSectionsByCoursesSequence(data.coursesequenceid);
          this.toastr.success('Section updated successfully');
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
          this.toastr.error('Failed to update Section');
        },
      });
  }

  programs: any = [];
  filePath: string = '';

  // get programs
  GetAllPrograms() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Program/GetAllPrograms')
      .subscribe({
        next: (x) => {
          this.spinner.hide();
          this.programs = x;
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  // delete program
  DeleteProgram(id: number) {
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/Program/DeleteProgram/' + id)
      .subscribe({
        next: (x) => {
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

  //create program
  CreateProgram(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Program', data).subscribe({
      next: (x) => {
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

  // update program
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

  // get Testimonials
  testimonials: any = [];
  testimonialsWaiting: any = [];
  testimonialsAccepted: any = [];
  GetAllTestimonial() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/Testimonial').subscribe({
      next: (testimonial: any) => {
        this.spinner.hide();
        this.testimonials = testimonial;
        this.testimonialsWaiting = testimonial.filter(
          (testimonial: any) => testimonial.status == 'w'
        );
        this.testimonialsAccepted = testimonial
          .filter((testimonial: any) => testimonial.status == 'a')
          .sort((a: any, b: any) => b.testimonialId - a.testimonialId);
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  // accept Testimonials
  AcceptTestimonial(id: number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Testimonial/AcceptTestimonial/' + id)
      .subscribe({
        next: (testimonial: any) => {
          this.spinner.hide();
          this.GetAllTestimonial();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  // reject Testimonials
  RejectTestimonial(id: number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Testimonial/RejectTestimonial/' + id)
      .subscribe({
        next: (testimonial: any) => {
          this.spinner.hide();
          this.GetAllTestimonial();
        },
        error: (err) => {
          console.log(err);
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

  CreateCertificationCourseSequence(id: number, programid: number) {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Certification/PassUser/' + id)
      .subscribe({
        next: (x: any) => {
          this.GetCoursesSequenceByProgramId(programid);
          this.spinner.hide();
          if (x.rowsAffected == 1) {
            this.toastr.success('Created Certification success');
          } else {
            this.toastr.error('Created Certification error');
          }
        },
        error: (err) => {
          this.toastr.error('Created Certification error');
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
  Mysections: any = [];
  students: any = [];
  filterdStudents: any = [];
  getSectionByCourseId(id: number) {
    this.http.get(`${URL}/Section/GetSectionByCourseId/` + id).subscribe({
      next: (res) => {
        this.spinner.show();
        this.Mysections = res;
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
      next: (res) => {
        if (res === 0) {
          this.toastr.error('Section is full, Or student already in section');
        } else {
          this.toastr.success('User Added in the section');
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  UserSectionsBySectionId: any = [];
  GetAllUserSectionBySectionId(id: number) {
    this.http
      .get(`${URL}/UserSection/GetAllUserSectionsBySectionId/${id}`)
      .subscribe({
        next: (res) => {
          this.spinner.show();
          this.UserSectionsBySectionId = res;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error('Can not load data');
        },
      });
  }
  DeleteUserSection(id: number) {
    this.http.delete(`${URL}/UserSection/${id}`).subscribe({
      next: () => {
        this.toastr.success('User Deleted from section');
      },
      error: () => {
        this.toastr.error('Can not delete user from section');
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

  /* Badge */
  badge: any = [];
  getAllBadges() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/BadgeActivity/').subscribe({
      next: (res) => {
        this.badge = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  updateBadge(data: any) {
    console.log(data)
    this.http.put('https://localhost:7036/api/BadgeActivity/', data).subscribe({
      next: (res) => {
        this.getAllBadges();
        this.toastr.success('Badge Updated Successfuly');
        return res;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Sorry, Badge Updated Failed');
      },
    });
  }

  /* Points */
  points: any = [];
  pointsCoursesComplete: any = [];
  pointsLoginDays: any = [];

  getAllPoints() {
    this.spinner.show();
    this.http.get('https://localhost:7036/api/PointsActivity/').subscribe({
      next: (result: any) => {
        this.points = result.filter(
          (x: any) =>
            x.pointsactivityname != 'Complete Course' &&
            x.pointsactivityname != 'Login Days'
        );
        this.pointsCoursesComplete = result.filter(
          (x: any) => x.pointsactivityname == 'Complete Course'
        );
        this.pointsLoginDays = result.filter(
          (x: any) => x.pointsactivityname == 'Login Days'
        );

        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  CreateNewPointsActivity(data: any) {
    console.log(data);
    this.http
      .post('https://localhost:7036/api/PointsActivity/', data)
      .subscribe({
        next: (result) => {
          this.getAllPoints();
          this.toastr.success('Points Created');
          return result;
        },
        error: (err) => {
          this.toastr.error('Sorry, Points Create Failed');
        },
      });
  }

  updatePoints(data: any) {
    this.http
      .put('https://localhost:7036/api/PointsActivity/', data)
      .subscribe({
        next: (result) => {
          this.getAllPoints();
          this.toastr.success('Points Updated');
          return result;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Sorry, Points Update Failed');
        },
      });
  }


  DeletePointsActivity(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:7036/api/PointsActivity/' + id).subscribe({
      next: () => {
        this.getAllPoints();
        this.spinner.hide();
        this.toastr.success('Points Activity deleted successfully');
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error('Points Activity to delete role');
      },
    });
  }

  
  /*
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
  } */

  /* Cuopon */
  coupon: any = [];
  getAllCoupon() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Coupon/GetAllCoupons/')
      .subscribe({
        next: (result) => {
          this.coupon = result;
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        },
      });
  }

  createCoupon(data: any) {
    this.http
      .post('https://localhost:7036/api/Coupon/CreateCoupon/', data)
      .subscribe({
        next: () => {
          this.toastr.success('Coupon Created');
          this.getAllCoupon();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Sorry, Coupon creation failed');
        },
      });
  }

  deleteCoupon(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:7036/api/Coupon/' + id).subscribe({
      next: (result) => {
        this.toastr.success('Coupon has been deleted');
        this.getAllCoupon();
        this.spinner.hide();
        return result;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Sorry, Error Deleting Coupon');
        this.spinner.hide();
        this.toastr.error('Sorry, Error Deleting Coupon');
      },
    });
  }

  updateCoupon(data: any) {
    this.http
      .put('https://localhost:7036/api/Coupon/UpdateCoupon/', data)
      .subscribe({
        next: (result) => {
          this.getAllCoupon();
          this.toastr.success('Coupon has been Updated');
          return result;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Sorry, Coupon Updated Failed');
        },
      });
  }

  /*Contact Us*/
  messages: any = [];
  getAllMessages() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/ContactUs/GetAllContacts')
      .subscribe({
        next: (result) => {
          this.messages = result;
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        },
      });
  }

  deleteMessages(id: number) {
    this.http.delete('https://localhost:7036/api/ContactUs/' + id).subscribe({
      next: (result) => {
        this.getAllMessages();
        this.toastr.success('Message has been deleted successfuly');
        return result;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Sorry, Error Deleting Message');
      },
    });
  }
  AlertShow: boolean = false;
  CreateMessage(data: any) {
    //debugger
    this.http.post(`${URL}/ContactUs`, data).subscribe({
      next: () => {
        this.AlertShow = true;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  unAcceptedUser: any = [];
  GetUnAcceptedUsers() {
    this.spinner.show();
    this.http.get(`${URL}/User/GetUnAcceptedUsers`).subscribe(
      (res) => {
        this.unAcceptedUser = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  UpdatedUserStatus(userDetails: any) {
    this.http.put(`${URL}/User/UpdatedUserStatus`, userDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.success('User status has been updated');
            this.GetUnAcceptedUsers();
          }, 1000);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }

  /* Admin Report */
  StudentsReports: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  GetAllStudentsReports() {
    this.http.get(`${URL}/AdminReport/GetAllStudentsReport`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.StudentsReports.data = res as any[];
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  StudentReportsDetails: any = [];
  GetStudentReportsDetails(id: number) {
    this.http
      .get(`${URL}/AdminReport/GetAllStudentsDetailsReport/${id}`)
      .subscribe({
        next: (res) => {
          this.spinner.show();
          this.StudentReportsDetails = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }

  SectionsReports: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  GetAllSectionsReports() {
    this.http.get(`${URL}/AdminReport/GetAllSectionsReport`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.SectionsReports.data = res as any[];
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  CleanAdminData() {
    this.Mysections = [];
    this.Role = [];
    this.StudentReportsDetails = [];
    this.UserSectionsBySectionId = [];
    this.Users = [];
    this.educationalPeriods = [];
  }

  RankingByBadges: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  GetRankingByBadges() {
    this.http.get(`${URL}/AdminLeaderBoard/ByBadges`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.RankingByBadges.data = res as any[];
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  RankingByPoints: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  GetRankingByPoints() {
    this.http.get(`${URL}/AdminLeaderBoard/ByPoints`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.RankingByPoints.data = res as any[];
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  AdminStatistics: any = [];
  GetStatistics() {
    this.http.get(`${URL}/AdminLeaderBoard/Statistics`).subscribe({
      next: (res) => {
        this.spinner.show();
        this.AdminStatistics = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  AdminReportDetails: any = [];
  GetAdminReportDashboardDetails() {
    this.spinner.show();
    this.http.get(`${URL}/AdminReport/GetAdminReportStatistics`).subscribe(
      (res) => {
        this.AdminReportDetails = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    );
  }
}
