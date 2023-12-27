import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from 'src/app/Services/instructor.service';

class Question {
  public Questionweight: number = 0;
  public Questiondescription: any;
  
}

class QuestionOption {
  public Questionoptiondescription: any;
  public Iscorrect: any;
}

export class QuestionWithOptions {
  public question: Question = new Question();
  public questionOption: QuestionOption[] = [];
}

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent {
  constructor(public instructorService: InstructorService, private toastr: ToastrService){}
  
  
  @Input() questionIndex: number = 0;
  @Input() examId: number = 0;
  ngOnInit(){
    console.log(this.examId);
    
  }
  question: Question = new Question();
  questionWithOptions: QuestionWithOptions = new QuestionWithOptions();
  questionOption: QuestionOption[] = Array.from({ length: 4 }, () => ({ Questionoptiondescription: '', Iscorrect: false }));
  Created = false;
  CreateQuestion() {
    
    this.questionWithOptions.question = this.question; 
    this.questionWithOptions.questionOption = this.questionOption; 
    
    this.instructorService.CreateQuestionWithOptions(this.examId, this.questionWithOptions)
    .subscribe(
      (response) => {
        try {
          const jsonResponse = JSON.parse(response);
          console.log('Success:', jsonResponse);
          
        } catch (error) {
          console.log('Success:', response);
          
        }
        this.toastr.success('Question Created');
        this.Created = true;
      },
      (error) => {
        console.error('Error:', error);
        this.toastr.error('Question Create Faild');
        
      }
    );
    
    
  }


}
