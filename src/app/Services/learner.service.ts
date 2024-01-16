import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { getToken } from '../constants/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LearnerService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    let token: any = getToken();
    let userId = 0;
    let username = null;
    console.log(token);
    if (token && token.userId != null) {
      userId = token.userId;
      username = token.userName;
    }
    this.userId = userId;
    this.username = username;
  }
  userId: any = 0;
  username: any = null;
  CartItemsByUserId: any = [];
  CartTotal: any;
  CartId: any;
  GetCartItemsByUserId() {
    this.spinner.show();
    this.http.get(`${URL}/CartItems/` + this.userId).subscribe(
      (res: any) => {
        let cartId = 0;
        let cartTotal = 0;
        if (res && res[0] && res[0].cartid) {
          this.CartItemsByUserId = res;
          cartId = res[0].cartid;
          cartTotal = res.reduce((accumulator: any, currentItem: any) => {
            const discountedPrice =
              currentItem.program.programprice -
              currentItem.program.programprice *
                (currentItem.program.programsale / 100);
            return accumulator + discountedPrice;
          }, 0);
        } else {
          this.CartId = 0;
          this.CartTotal = 0;
          this.CartItemsByUserId = [];
        }
        this.CartId = cartId;
        this.CartTotal = cartTotal;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
    );
  }
  AddCartItem(cartItemDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/CartItems`, cartItemDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.show('Item has been added to your cart');
          }, 1000);
        }
      },
      (error) => {
        console.log(error.message);
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.info('item is already exist on your cart ');
        }, 1000);
      }
    );
  }
  DeleteCartItem(cartItemId: any, cartItemPrice: number) {
    this.spinner.show();
    this.http
      .delete(`${URL}/CartItems/` + cartItemId + '/' + cartItemPrice)
      .subscribe(
        (res) => {
          if (res) {
            this.GetCartItemsByUserId();
            setTimeout(() => {
              this.toastr.success('Item has been deleted from your cart!');
              this.spinner.hide();
            }, 1000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.info('item is already exist on your cart ');
          }, 1000);
        }
      );
  }
  UpdateCartTotal(cartToUpdate: any) {
    this.http.put(`${URL}/Cart`, cartToUpdate).subscribe((res) => {
      if (res) {
        console.log('CartUpdated!');
      }
    });
  }
  CreatePayment(paymentDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/Payment`, paymentDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.success(
              'Thank you for your shopping with us',
              'Successfully paid!'
            );
          }, 1000);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          console.log(error);
          this.toastr.info('item is already exist on your cart ');
        }, 1000);
      }
    );
  }
  AlertShow: boolean = false;

  CreateTestimonial(review: string) {
    console.log(this.userId, review);
    let testimonial: any = {
      userid: this.userId,
      review: review,
    };
    this.spinner.show();
    this.http.post(`${URL}/Testimonial`, testimonial).subscribe({
      next: () => {
        this.spinner.hide();
        this.AlertShow = true;
      },
      error: (err) => {
        this.spinner.hide();
      },
    });
  }
  Orders: any = [];
  GetAllOrders() {
    this.http.get(`${URL}/Cart/` + this.userId).subscribe((res) => {
      this.Orders = res;
    });
  }
  AddUserToSection(sectionId: number) {
    let userDetails: any = {
      userid: this.userId,
      sectionid: sectionId,
    };
    this.http.post(`${URL}/UserSection`, userDetails).subscribe({
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
  userPrograms: any = [];
  GetUserPrograms() {
    this.spinner.show();

    this.http
      .get(`${URL}/Program/GetProgramsByUserId/` + this.userId)
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.userPrograms = res;
          } else {
            this.userPrograms = [];
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            console.log(error.message);
          }, 1000);
        }
      );
  }

  CourseMaterials: any = [];
  SectionAnnocment: any = [];
  UserProgress: any = [];
  GetSectionsByCourseSequenceIdAndUserId(courseSequenceId: number) {
    this.spinner.show();
    this.http
      .get(
        `${URL}/Section/GetSectionsByUserIdAndCourseSequence/` +
          this.userId +
          '/' +
          courseSequenceId
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.GetCourseMaterialBySectionId(res.sectionid);
            this.GetSectionAnnoncmentBySectionId(res.sectionid);
            this.GetUserProgressBySectionId(res.sectionid);
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            console.log(error.message);
          }, 1000);
        }
      );
  }
  GetCourseMaterialBySectionId(sectionId: number) {
    this.http
      .get(`${URL}/CourseSection/GetCoursesSectionBySectionId/` + sectionId)
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.CourseMaterials = res;
          } else {
            this.CourseMaterials = [];
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
  GetSectionAnnoncmentBySectionId(sectionId: number) {
    this.http
      .get(`${URL}/Announcement/GetAnnouncementsBySectionId/` + sectionId)
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.SectionAnnocment = res;
          } else {
            this.SectionAnnocment = [];
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
  GetUserProgressBySectionId(sectionId: number) {
    this.spinner.show();
    this.http
      .get(
        `${URL}/UserProgress/GetAllUserProgressPerSection/` +
          this.userId +
          '/' +
          sectionId
      )
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.UserProgress = res;
          } else {
            this.UserProgress = [];
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
  updateUserId() {
    let token: any = getToken();
    if (token && token.userId != null) {
      this.userId = token.userId;
    }
  }

  reportUser: any = [];
  reportUserFilter: any = [];
  GetCoursesByProgramId(programId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/User/ReportsByUserId/' +
          this.userId +
          '/' +
          programId
      )
      .subscribe({
        next: (x: any) => {
          this.reportUser = x;
          console.log('-----------');
          console.log(this.reportUser);
          console.log('-----------');
          this.reportUserFilter = x;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  programsBytUserId: any = [];
  GetProgramsByUserId() {
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/User/GetProgramsByUserId/' + this.userId)
      .subscribe({
        next: (x: any) => {
          this.programsBytUserId = x;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  allSectionsByLearnerId: any = [];
  GetAllSectionsByLearnerId() {
    console.log(this.userId);
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/ExamLearner/GetAllSectionsByLearnerId/' +
          this.userId
      )
      .subscribe({
        next: (x: any) => {
          this.allSectionsByLearnerId = x;
          this.allExamByUserSection = [];
          setTimeout(() => {
            this.spinner.hide();
          }, 200);
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  allExamByUserSection: any = [];
  GetAllExamByUserSection(sectionId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/ExamLearner/GetAllExamByUserSection/' +
          this.userId +
          '/' +
          sectionId
      )
      .subscribe({
        next: (x: any) => {
          this.allExamByUserSection = x;
          setTimeout(() => {
            this.spinner.hide();
          }, 250);
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
  }

  CreateExamSolution(data: any) {
    this.spinner.show();
    this.http.post('https://localhost:7036/api/ExamLearner', data).subscribe({
      next: () => {
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
      },
    });
  }
  SectionsByUserId: any = [];
  GetSectionsByUserId() {
    this.spinner.show();
    this.http
      .get(`${URL}/Section/GetSectionsByUserId/` + this.userId)
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.SectionsByUserId = res;
          } else {
            this.SectionsByUserId = [];
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            console.log(error.message);
            this.toastr.error(error.message);
          }, 1000);
        }
      );
  }
  CreateAssignmentSolution(assignmentDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/AssignmentSolution`, assignmentDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.toastr.success('Your solution has been sent successfully');
            this.spinner.hide();
          }, 1000);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          console.log(error);
        }, 1000);
      }
    );
  }
  GetAssignmentSolutionByUserId(assignmentId: number) {
    return this.http.get(
      `${URL}/AssignmentSolution/GetAssignmentSolutionByUserId/` +
        assignmentId +
        '/' +
        this.userId
    );
  }
  UpdateAssignmentSolution(assignmentSolutionDetails: any) {
    this.http
      .put(`${URL}/AssignmentSolution`, assignmentSolutionDetails)
      .subscribe(
        (res) => {
          if (res) {
            setTimeout(() => {
              this.toastr.success(
                'Your solution has been updated successfully'
              );
              this.spinner.hide();
            }, 1000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            console.log(error);
          }, 1000);
        }
      );
  }
  CreateUserProgress(lectureId: number, sectionId: number) {
    let userProgress = {
      lectureid: lectureId,
      userid: this.userId,
      sectionid: sectionId,
    };
    this.spinner.show();
    this.http.post(`${URL}/UserProgress`, userProgress).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 300);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
      }
    );
  }
  DeleteUserProgress(lectureId: number) {
    this.http.delete(`${URL}/userProgress/` + lectureId).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 300);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
      }
    );
  }

  GetUserProgressPerCourse(programId: number) {
    return this.http.get(
      `${URL}/Userprogress/GetProgressPerCourse/` +
        this.userId +
        '/' +
        programId
    );
  }
  GetLecturesPerCourse(programId: number) {
    return this.http.get(
      `${URL}/Lecture/GetLecturesCountPerCourse/` +
        this.userId +
        '/' +
        programId
    );
  }
  GetUserPoints() {
    return this.http.get(`${URL}/UserPoints/` + this.userId);
  }
  UpdateUserPointsStart(userPointsId: number) {
    this.http.put(`${URL}/UserPoints/` + userPointsId, {}).subscribe((res) => {
      if (res) {
        console.log('update succ');
      }
    });
  }
  GetCouponByName(couponName: string) {
    return this.http.get(
      `${URL}/UserCoupon/GetUserCouponByUserIdAndCouponName/` +
        this.userId +
        '/' +
        couponName
    );
  }
  UpdateUserCoupon(userCouponId: number) {
    this.http.put(`${URL}/UserCoupon/${userCouponId}`, {}).subscribe((res) => {
      if (res) {
        console.log('Done  ');
      }
    });
  }
  UserCoupons: any = [];
  GetAllUserCoupons() {
    this.spinner.show();
    this.http
      .get(`${URL}/UserCoupon/GetAllUserCouponsByUserId/` + this.userId)
      .subscribe(
        (res: any) => {
          if (res && res[0]) {
            this.UserCoupons = res;
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        },
        (error) => {
          console.log(error.message);
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
      );
  }
  CleanLearnerData() {
    this.CartId = 0;
    this.CartItemsByUserId = [];
    this.CartTotal = 0;
    this.CourseMaterials = [];
    this.Orders = [];
    this.SectionAnnocment = [];
    this.SectionsByUserId = [];
    this.userPrograms = [];
    this.UserProgress = [];
    this.UserDashboarInfoByUserId = [];
    this.MyCompletedCourses = [];
    this.UserDashboardAttendences = [];
    this.allExamByUserSection = [];
    this.allSectionsByLearnerId = [];
    this.examDetailsById = [];
    this.examDetailsByUserId = [];
    this.userId = 0;
  }

  UserDashboarInfoByUserId: any;
  UserDashboardInfoByUserId(id: number) {
    this.http
      .get(`${URL}/UserDashboardInfo/UserDashboardInfoByUserId/${id}`)
      .subscribe({
        next: (res) => {
          this.spinner.show;
          this.UserDashboarInfoByUserId = res;
          this.spinner.hide;
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }

  GetUserByUserId(id: number): Observable<any> {
    return this.http.get(`${URL}/User/${id}`);
  }
  successFlag: boolean = false;
  UpdateProfile(user: any) {
    this.spinner.show();
    this.http.put(`${URL}/User`, user).subscribe({
      next: () => {
        this.spinner.hide();
        this.successFlag = true;
        console.log(user);
      },
      error: () => {
        this.toastr.error('Profile updated Faild');
        this.spinner.hide();
        console.log(user);
      },
    });
  }

  UserDashboardAttendences: any = [];
  UserDashboardAttendence(userid: number, sectionid: number) {
    this.http
      .get(
        `${URL}/UserDashboardInfo/UserDashboardAttendence/${userid}/${sectionid}`
      )
      .subscribe({
        next: (res) => {
          this.spinner.show;
          this.UserDashboardAttendences = res;
          this.spinner.hide;
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }
  MyCompletedCourses: any = [];
  CompletedCourses(id: number) {
    this.http.get(`${URL}/UserDashboardInfo/CompletedCourses/${id}`).subscribe({
      next: (res) => {
        this.spinner.show;
        this.MyCompletedCourses = res;
        this.spinner.hide;
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  examDetailsByUserId: any = {};
  GetExamDetailsByUserId(examId: number) {
    this.spinner.show();
    this.http
      .get(
        'https://localhost:7036/api/ExamLearner/GetExamDetailsByUserId/' +
          this.userId +
          '/' +
          examId
      )
      .subscribe({
        next: (result: any) => {
          this.examDetailsByUserId = result;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
  }

  examDetailsById: any = {};
  GetExamDetailsById(examId: number) {
    console.log(examId);
    this.spinner.show();
    this.http
      .get('https://localhost:7036/api/Exam/GetExamById/' + examId)
      .subscribe({
        next: (result: any) => {
          this.examDetailsById = result;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
  }

  // startExam(): Observable<any> {
  //   return this.http.post('/api/exam/start', {});
  // }

  // getRemainingTime(): Observable<any> {
  //   return this.http.get('/api/exam/time');
  // }

  testimonialByUserId: any = [];
  GetTestimonialByUserId(id: number) {
    console.log(this.userId);
    this.http.get(`${URL}/Testimonial/GetByUserId/` + id).subscribe({
      next: (result) => {
        this.spinner.show();
        this.testimonialByUserId = result;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }
  UserBadges: any = [];
  GetUserBadges() {
    this.spinner.show();
    this.http.get(`${URL}/BadgeActivity/` + this.userId).subscribe(
      (res) => {
        if (res) {
          this.UserBadges = res;
        } else {
          this.UserBadges = [];
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    );
  }
  GetUnViewedUserBadges() {
    return this.http.get(
      `${URL}/BadgeActivity/UnviewedUserBadges/` + this.userId
    );
  }
  UpdateUserBadgeStatue(
    userBadgeId: number,
    badgeImage: string,
    badgeactivityid: number
  ) {
    let userbadgedetails: any = {
      userbadgeactivityid: userBadgeId,
      username: this.username,
      badgeimage: badgeImage,
      badgeactivityid: badgeactivityid,
    };
    this.http
      .put(`${URL}/BadgeActivity/UpdateUserBadgeStatus/`, userbadgedetails)
      .subscribe(
        (res) => {
          if (res) {
            console.log('Updated');
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
  SectionIdFromSequence: any;
  GetSectionByCourseSequenceId(courseSquenceId: number, userId: number) {
    this.http
      .get(
        `${URL}/CourseSequence/GetSectionByCourseSequenceId/${courseSquenceId}/${userId}`
      )
      .subscribe({
        next: (result) => {
          this.spinner.show();
          this.SectionIdFromSequence = result;
          this.spinner.hide();
        },
        error: (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        },
      });
  }
  TopThreeStudents: any = [];
  GetTopThreeStudents(id: number) {
    this.http.get(`${URL}/Section/Top3BySectionId/${id}`).subscribe({
      next: (result) => {
        this.spinner.show();
        this.TopThreeStudents = result;
        this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      },
    });
  }

  finishedPrograms: any = [];
  GetFinishedPrograms(id: number) {
    this.http.get(`${URL}/UserReview/finished-programs/${id}`).subscribe({
      next: (result) => {
        this.finishedPrograms = result;
        console.log(result);
        
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  PostUserReview(data: any){
    this.http.post(`${URL}/UserReview`, data).subscribe({
      next:()=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  clearCache() {
    this.finishedPrograms = [];
  }
}
