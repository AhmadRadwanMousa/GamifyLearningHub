import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-material',
  templateUrl: './manage-material.component.html',
  styleUrls: ['./manage-material.component.scss'],
})
export class ManageMaterialComponent {
  constructor(
    public _instructorService: InstructorService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this._instructorService.GetSectionsByUserId();
  }

  selectedSection: any;
  filesName: any;
  filesPath: any;

  @ViewChildren(MatAccordion) accordions: QueryList<MatAccordion> | undefined;
  @ViewChild('CreateDialog') CreateCourseSectionDialog: any;
  @ViewChild('UpdateDialog') UpdateCourseSectionDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmationDeleteDialog: any;
  @ViewChild('CreateLectureDialog') CreateLectureDialog: any;
  @ViewChild('ConfirmationLectureDialog') ConfirmationDeleteLectureDialog: any;
  @ViewChild('UpdateLectureDialog') UpdateLectureDialog: any;

  CreateCourseSectionForm: FormGroup = new FormGroup({
    coursesectionname: new FormControl('', Validators.required),
    coursesectionduration: new FormControl('', Validators.required),
    sectionid: new FormControl(),
  });

  UpdateCourseSectionForm: FormGroup = new FormGroup({
    coursesectionid: new FormControl(),
    coursesectionname: new FormControl('', Validators.required),
    coursesectionduration: new FormControl('', Validators.required),
    sectionid: new FormControl(),
    section: new FormControl(),
    lectures: new FormControl(),
  });

  CreateLectureForm: FormGroup = new FormGroup({
    coursesectionid: new FormControl(),
    lecturename: new FormControl('', Validators.required),
    lecturefile: new FormControl(),
    lectureduration: new FormControl('', Validators.required),
  });

  UpdateLectureForm: FormGroup = new FormGroup({
    lectureid: new FormControl(),
    coursesectionid: new FormControl(),
    lecturename: new FormControl('', Validators.required),
    lecturefile: new FormControl(),
    lectureduration: new FormControl('', Validators.required),
    coursesection: new FormControl(),
    userprogresses: new FormControl(),
  });

  openAllPanels() {
    console.log('Opening all panels');
    if (this.accordions) {
      this.accordions.forEach((accordion) => accordion.openAll());
    }
  }

  closeAllPanels() {
    console.log('Closing all panels');
    if (this.accordions) {
      this.accordions.forEach((accordion) => accordion.closeAll());
    }
  }

  loadMaterial(sectionId: number) {
    this._instructorService.GetAllMaterialsBySectionId(sectionId);
    console.log(this.selectedSection);
  }

  OpenCreateDialog() {
    this.dialog.open(this.CreateCourseSectionDialog);
  }

  CreateCourseSection() {
    this.CreateCourseSectionForm.controls['sectionid'].setValue(
      this.selectedSection
    );

    this._instructorService.CreateCourseSection(
      this.CreateCourseSectionForm.value
    );
  }

  CreateLecture() {
    this.CreateLectureForm.controls['lecturefile'].setValue(this.filesPath);

    this._instructorService.CreateLecture(
      this.CreateLectureForm.value,
      this.selectedSection
    );
  }

  OpenCreateLectureDialog(id: number) {
    this.CreateLectureForm.controls['coursesectionid'].setValue(id);
    // this.CreateLectureForm.controls['lecturefile'].setValue(this.filesPath);

    this.dialog.open(this.CreateLectureDialog);
  }

  OpenUpdateDialog(data: any) {
    this.UpdateCourseSectionForm.setValue(data);
    this.dialog.open(this.UpdateCourseSectionDialog);
  }

  OpenUpdateLectureDialog(data: any) {
    this.UpdateLectureForm.setValue(data);
    this.dialog.open(this.UpdateLectureDialog);
  }

  UpdateCourseSection() {
    this._instructorService.UpdateCourseSection(
      this.UpdateCourseSectionForm.value
    );
  }

  UpdateLecture() {
    this.UpdateLectureForm.controls['lecturefile'].setValue(this.filesPath);

    this._instructorService.UpdateLecture(
      this.UpdateLectureForm.value,
      this.selectedSection
    );
  }

  OpenConfirmDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmationDeleteDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeletCourseSection(id);
    });
  }

  OpenConfirmLectureDialog(lectureId: number) {
    var dialog = this.dialog.open(this.ConfirmationDeleteLectureDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeletLecture(lectureId);
    });
  }

  DeletLecture(lectureId: number) {
    this._instructorService.DeleteLecture(lectureId, this.selectedSection);
  }

  DeletCourseSection(id: number) {
    this._instructorService.DeleteCourseSection(id, this.selectedSection);
  }

  UploadFiles(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.filesName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this._instructorService.UploadFiles(formData).subscribe((path: string) => {
      this.filesPath = path;
    });
  }
}
