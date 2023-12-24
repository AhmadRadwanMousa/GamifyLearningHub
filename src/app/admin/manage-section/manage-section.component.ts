import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators ,ValidatorFn  , AbstractControl } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';


//validations
//for number not string 
const numberValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const isNumber = !isNaN(Number(control.value));
  return isNumber ? null : { 'notANumber': { value: control.value } };
};

//check if the input starts with a letter 
const NameValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const value = control.value;
  const startsWithLetter = /^[a-zA-Z]/.test(value);

  return startsWithLetter
    ? null
    : { 'invalidSectionName': { value: control.value } };
};

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss'],
})
export class ManageSectionComponent {
  constructor(public _sectionService: AdminService, public dialog: MatDialog) {}

  
 
  // CRUD
  ngOnInit() {
    this._sectionService.getAllSections();
    this._sectionService.getAllUsersWithRoleId2().subscribe(() => {
     
    });
  }

  fileName: any;
  filePath: any;


  DeleteSection(id: number) {
    this._sectionService.DeleteSection(id);
  }

  CreateSection() {
    // Check if a file is selected
    const fileToUpload = this.CreateSectionForm.get('imageFile')?.value;

    if (fileToUpload) {
      // Upload the file first
      const formData = new FormData();
      formData.append('file', fileToUpload);

      this._sectionService.UploadFile(formData).subscribe((path: string) => {
        // Update the image path in your form
        this.CreateSectionForm.patchValue({ imageName: path });

        // Continue with creating the section
        this.CreateSectionForm.controls['imagename'].setValue(this.filePath);

        // Now, create the section
        this._sectionService.CreateSection(this.CreateSectionForm.value);
      });
    } else {
      // No file selected, create the section without uploading
      this.CreateSectionForm.controls['imagename'].setValue(this.filePath);
      this._sectionService.CreateSection(this.CreateSectionForm.value);
    }
  }

  UpdateSection() {
    // const formData = new FormData();
    this.UpdateSectionForm.controls['imagename'].setValue(this.filePath);

    this._sectionService.UpdateSection(this.UpdateSectionForm.value);
  }

  // FormGroups
  CreateSectionForm: FormGroup = new FormGroup({
    sectionname: new FormControl('', [Validators.required, Validators.minLength(4), NameValidator]),
    sectionsize: new FormControl('', [Validators.required, numberValidator]), 
    imageFile: new FormControl(''), 
    imagename: new FormControl(''),
    userid: new FormControl('', [Validators.required]), 
  });

  //create validations

  
  UpdateSectionForm: FormGroup = new FormGroup({
    sectionid: new FormControl(''),
    sectionname: new FormControl(''),
    sectionsize: new FormControl(''),
    imagename: new FormControl(''),
    userid: new FormControl('', [Validators.required]),
   
  });

  
  // Dialogs
  @ViewChild('ConfirmationDialog') ConfirmDeleteDialog: any;
  @ViewChild('CreateDialog') CreateSectionDialog: any;
  @ViewChild('UpdateDialog') UpdateSectionDialog: any;

  OpenConfirmDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmDeleteDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.DeleteSection(id);
    });
  }

  OpenCreateDialog() {
    this.dialog.open(this.CreateSectionDialog, {
      width: '750px',
      height: '448px',
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000,
    });
  }

  OpenUpdateDialog(section: any) {
    // Set values in the update form
    this.UpdateSectionForm.setValue({
      sectionid: section.sectionid,
      sectionname: section.sectionname,
      sectionsize: section.sectionsize,
      imagename : '',
      userid: section.userid,
      
    });
  
    this.dialog.open(this.UpdateSectionDialog, {
      width: '750px',
      height: '484px',
    });
  }

  // File upload change event
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.CreateSectionForm.patchValue({ imageFile: file });
  }

  

  getImagePath() {
  const imageFileControl = this.CreateSectionForm.get('imageFile');
  if (imageFileControl && imageFileControl.value) {
    // Convert the file to a data URL
    return URL.createObjectURL(imageFileControl.value);
  }
  return null;
}


UploadFile(event: any) {
  let fileToUpload = event.target.files[0] as File;
  if (!fileToUpload) {
    return;
  }
  this.fileName = fileToUpload.name;
  const formData = new FormData();
  formData.append('file', fileToUpload);
  this._sectionService.UploadFile(formData).subscribe((path: string) => {
    this.filePath = path;
  });
}


  
}