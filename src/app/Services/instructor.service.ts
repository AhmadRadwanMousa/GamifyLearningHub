import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';
import { QuestionWithOptions } from 'src/app/instructor/question-form/question-form.component';
import { catchError } from 'rxjs';
import { RouterPreloader } from '@angular/router';
import { max } from 'rxjs';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    let token: any = localStorage.getItem('token');
    const tokenPayload: any = jwtDecode(token);
    this.userId = Number(tokenPayload.userId);
  }
  MyInstructorSections: any = [];
  GetAllInstructorSectionsById(id: number) {
    this.http
      .get(`${URL}/TakeAttendenceBySection/GetSectionsByInstructor/${id}`)
      .subscribe({
        next: (res) => {
          this.MyInstructorSections = res;
        },
      });
  }

  examsBySection: any = [];
  getAllExamsBySectionId(id: number) {
    this.http.get(`${URL}/Exam/GetAllExamsBySectionId/${id}`).subscribe({
      next: (res) => {
        this.examsBySection = res;
      },
      error: (err) => {
        this.toastr.info('there is no exams in this section');
      },
    });
  }

  CreateExam(data: any) {
    this.http.post(`${URL}/Exam/`, data).subscribe({
      next: () => {
        this.toastr.success('Exam created successflly');
      },
      error: () => {
        this.toastr.error('Exam Create Faild');
      },
    });
  }

  CreateQuestionWithOptions(
    examId: number,
    questionWithOptions: QuestionWithOptions
  ) {
    const url = `${URL}/Exam/CreateQuestionWithOptions/${examId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(url, questionWithOptions, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('HTTP Request Error:', error);
          throw error;
        })
      );
  }
  DeleteExam(id: number) {
    this.http.delete(`${URL}/Exam/DeleteExam/${id}`).subscribe({
      next: () => {
        this.toastr.success('Exam deleted successflly');
      },
      error: () => {
        this.toastr.error('Exam delete Faild');
      },
    });
  }

  QuestionAndOptions: any = [];
  GetQuestionAndOptionsByExamId(id: number) {
    this.http.get(`${URL}/Exam/GetAllQuestionByExamId/${id}`).subscribe({
      next: (res) => {
        this.QuestionAndOptions = res;
        console.log(this.QuestionAndOptions);
      },
      error: () => {
        this.toastr.error('load questions faild');
      },
    });
  }

  DeleteQuestion(id: number) {
    this.http.delete(`${URL}/Exam/DeleteQuestion/${id}`).subscribe({
      next: () => {
        this.toastr.success('Deleted Seccessfully');
      },
      error: () => {
        this.toastr.error('Deleted Faild');
      },
    });
  }

  userId: any = 0;
  sectionsByUserId: any = [];

  GetSectionsByUserId() {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/Section/GetAllSectionsByUserId/' +
          this.userId
      )
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

  GetAllMaterialsBySectionId(sectionId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/CourseSection/GetCoursesSectionBySectionId/' +
          sectionId
      )
      .subscribe({
        next: (material: any) => {
          this.allMaterialsBySectionId = material;
          console.log(material);
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
        this.GetSectionsByUserId();
        this.GetAllMaterialsBySectionId(data.sectionid);
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
    this.http
      .put(
        'https://localhost:7036/api/CourseSection/' + data.coursesectionid,
        data
      )
      .subscribe({
        next: () => {
          console.log('Course Section Updated');
          this.GetSectionsByUserId();
          this.GetAllMaterialsBySectionId(data.sectionid);
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

  DeleteCourseSection(id: number, sectionid: number) {
    console.log(id);
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/CourseSection/' + id)
      .subscribe({
        next: (x: any) => {
          console.log('Deleted');
          this.GetSectionsByUserId();
          this.GetAllMaterialsBySectionId(sectionid);
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
    return this.http
      .post('https://localhost:7036/api/Upload/UploadFile', file)
      .pipe(
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

  CreateLecture(data: any, sectionid: number) {
    console.log(data);
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Lecture', data).subscribe({
      next: () => {
        console.log('Lecture Created');
        this.GetSectionsByUserId();
        this.GetAllMaterialsBySectionId(sectionid);
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

  DeleteLecture(id: number, sectionid: number) {
    console.log(id);
    this.spinner.show();
    this.http.delete('https://localhost:7036/api/Lecture/' + id).subscribe({
      next: (x: any) => {
        console.log('Deleted');
        this.GetSectionsByUserId();
        this.GetAllMaterialsBySectionId(sectionid);
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

  UpdateLecture(data: any, sectionid: number) {
    console.log(data);
    this.spinner.show();
    this.http
      .put('https://localhost:7036/api/Lecture/' + data.lectureid, data)
      .subscribe({
        next: () => {
          console.log('Lecture Updated');
          this.GetSectionsByUserId();
          this.GetAllMaterialsBySectionId(sectionid);
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
  sectionsByInstructorId: any = [];
  GetSectionsByInstructorId(instructorId: number) {
    this.spinner.show();
    this.http
      .get(`${URL}/Section/GetSectionsByInstructorId/` + instructorId)
      .subscribe(
        (res) => {
          this.sectionsByInstructorId = res;
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
  assignmentsBySection: any = [];
  GetAssignmentsBySectionId(sectionId: number) {
    this.spinner.show();
    this.http.get(`${URL}/Assignment/` + sectionId).subscribe(
      (res) => {
        this.assignmentsBySection = res;
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
  CreateAssignment(newAssignment: any) {
    this.spinner.show();
    this.http.post(`${URL}/Assignment`, newAssignment).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been created',
            'Successfully Created!'
          );
          this.GetAssignmentsBySectionId(newAssignment.sectionid);
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
  DeleteAssignment(assignmentId: number, sectionId: number) {
    this.http.delete(`${URL}/Assignment/` + assignmentId).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been deleted!',
            'Successfully deleted!'
          );
          this.GetAssignmentsBySectionId(sectionId);
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
  UpdateAssignment(updatedAssignment: any) {
    this.http.put(`${URL}/Assignment`, updatedAssignment).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been Updated!',
            'Successfully Updated!'
          );
          this.GetAssignmentsBySectionId(updatedAssignment.sectionid);
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
  //AssignmentSolution
  assignmentSolutions: any = [];
  maxMark: any;
  GetAssignmentSolutions(assignmentId: number) {
    this.spinner.show();
    this.http.get(`${URL}/AssignmentSolution/` + assignmentId).subscribe(
      (res: any) => {
        this.assignmentSolutions = res;

        let maxMark = 0;
        if (
          res &&
          res[0] &&
          res[0].assignment &&
          typeof res[0].assignment.assignmentmark !== 'undefined'
        ) {
          maxMark = res[0].assignment.assignmentmark;
        }
        this.maxMark = maxMark;
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
  UpdateAssignmentSolutionMark(solutionDetails: any, assignmentId: number) {
    this.http
      .put(
        `${URL}/AssignmentSolution/UpdateAssignmentSolutionMark`,
        solutionDetails
      )
      .subscribe(
        (res) => {
          if (res) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            this.toastr.success(
              'Assignment has been Updated!',
              'Successfully Updated!'
            );
            this.GetAssignmentSolutions(assignmentId);
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
}
