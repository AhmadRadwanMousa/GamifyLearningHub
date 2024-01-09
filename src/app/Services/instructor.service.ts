import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';
import { QuestionWithOptions } from 'src/app/instructor/question-form/question-form.component';
import { Observable, catchError, finalize } from 'rxjs';
import { RouterPreloader } from '@angular/router';
import { max } from 'rxjs';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MatTableDataSource } from '@angular/material/table';
import { getToken } from '../constants/token';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  //Attendence
  //get Sections by instructor id
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    let token: any = getToken();
    let userId = 0;
    if (token && token.userId != null) {
      userId = token.userId;
    }
    this.userId = userId;
  }

  allStudentsMarkByExamSectionId: any = [];

  GetAllStudentsMarkByExamSectionId(examId: number, sectionId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/Exam/GetUserMarks/' +
          examId +
          '/' +
          sectionId
      )
      .subscribe({
        next: (result: any) => {
          this.allStudentsMarkByExamSectionId = result;

          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
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

  CreateExam(data: any, sectionid: number) {
    this.http.post(`${URL}/Exam/`, data).subscribe({
      next: () => {
        this.toastr.success('Exam created successflly');
        this.getAllExamsBySectionId(sectionid);
        console.log(data);
      },
      error: () => {
        this.toastr.error('Exam Create Faild');
        console.log(data);
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
  DeleteExam(id: number, sectionid: number) {
    this.http.delete(`${URL}/Exam/DeleteExam/${id}`).subscribe({
      next: () => {
        this.toastr.success('Exam deleted successflly');
        this.getAllExamsBySectionId(sectionid);
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

  // announcements

  announcementsBySectionId: any = [];

  GetAnnouncementsBySectionId(sectionId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/Announcement/GetAnnouncementsBySectionId/' +
          sectionId
      )
      .subscribe({
        next: (announcements: any) => {
          this.announcementsBySectionId = announcements;

          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  CreateAnnouncements(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/Announcement', data).subscribe({
      next: () => {
        this.GetSectionsByUserId();
        this.GetAllMaterialsBySectionId(data.sectionid);
        this.GetAnnouncementsBySectionId(data.sectionid);
        this.spinner.hide();
        this.toastr.success('Announcement created successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to create announcement');
      },
    });
  }

  UpdateAnnouncements(data: any) {
    this.spinner.show();
    this.http.put('https://localhost:7036/api/Announcement', data).subscribe({
      next: () => {
        console.log('Announcement Updated');
        this.GetSectionsByUserId();
        this.GetAllMaterialsBySectionId(data.sectionid);
        this.GetAnnouncementsBySectionId(data.sectionid);
        this.spinner.hide();
        this.toastr.success('Announcement updated successfully');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Failed to update announcement');
      },
    });
  }

  DeleteAnnouncements(id: number, sectionid: number) {
    console.log(id);
    this.spinner.show();
    this.http
      .delete('https://localhost:7036/api/Announcement/' + id)
      .subscribe({
        next: (x: any) => {
          this.GetSectionsByUserId();
          this.GetAllMaterialsBySectionId(sectionid);
          this.GetAnnouncementsBySectionId(sectionid);

          this.spinner.hide();
          if (x == 1) {
            this.toastr.success('Delete announcement success');
          }
        },
        error: (err) => {
          console.log('error');

          this.toastr.error('Delete announcement error');
          this.spinner.hide();
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

  UpdateUserSectionAssignmentMark(
    mark: any,
    assignmentId: number,
    studentId: number
  ) {
    let details: any = new FormData();
    details.append('mark', mark);
    details.append('assignmentId', assignmentId);
    details.append('studentId', studentId);
    console.log(mark, assignmentId, studentId);
    this.http
      .put(`${URL}/UserSection/SetAssignmentMark`, details)
      .subscribe((res) => {
        if (res) {
          console.log('Done!');
        }
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
      (res: any) => {
        if (res && res[0]) {
          this.assignmentsBySection = res;
        } else {
          this.assignmentsBySection = [];
        }
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
  SectionsByInstructorId: any = [];

  getAllInstructorSections(id: number = 109) {
    this.http
      .get(`${URL}/TakeAttendenceBySection/GetSectionsByInstructor/${id}`)
      .subscribe({
        next: (res) => {
          this.SectionsByInstructorId = res;
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }

  //Get All Users In Single Section
  //Get Users By Section ID
  getUsersBySectionId(id: number): Observable<any[]> {
    this.spinner.show();
    return this.http
      .get<any[]>(
        'https://localhost:7036/api/UserSection/GetUsersBySectionId/' + id
      )
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
        catchError((error) => {
          this.toastr.error(error.message);
          this.spinner.hide();
          throw error;
        })
      );
  }
  careteAttendence(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(`${URL}/TakeAttendenceBySection`, data, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.toastr.success(res);
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
  }
  attendenceDetails: any = [];
  GetAttendencDetails(id: number) {
    this.http
      .get(`${URL}/TakeAttendenceBySection/GetAttendenceBySection/${id}`)
      .subscribe({
        next: (res) => {
          this.spinner.show();
          this.attendenceDetails = res;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error("Can't load details");
        },
      });
  }

  // <! -- Report Properties --!>

  report: any;
  filterdReport: any = [];
  reported: any = [];

  reports: any = [];
  getAllReports() {
    this.http.get('https://localhost:7036/api/Report/GetAllReport').subscribe({
      next: (result) => {
        this.report = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  reportsBySectionId: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  getAllReportsBySectionId(id: number) {
    this.http.get(`${URL}/Report/GetSectionReport/${id}`).subscribe({
      next: (res) => {
        this.reportsBySectionId.data = res as any[];
      },
      error: (err) => {
        this.toastr.info('there is no reports in this section');
      },
    });
  }
  CleanInstructorData() {
    this.assignmentsBySection = [];
    this.assignmentSolutions = [];
    this.sectionsByUserId = [];
    this.MyInstructorSections = [];
    this.SectionsByInstructorId = [];
    this.SectionsByInstructorId = [];
    this.QuestionAndOptions = [];
    this.allMaterialsBySectionId = [];
  }
  NumberOfInstructorStudents: any;
  GetInstructorStudents(id: number) {
    this.http
      .get(`${URL}/AdminLeaderBoard/InstructorStudents/${id}`)
      .subscribe({
        next: (res) => {
          this.NumberOfInstructorStudents = res;
        },
      });
  }
  RankingByPoints: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  GetRankingByPoints(id: number) {
    this.http
      .get(`${URL}/AdminLeaderBoard/InstructorPointsStudents/${id}`)
      .subscribe({
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
}
