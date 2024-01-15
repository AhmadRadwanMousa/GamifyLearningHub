import { Component } from '@angular/core';
import { CdkDragDrop,CdkDrag,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/Models/board.models';
import { Column } from 'src/app/Models/colum.model';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent {

  // Properties 
  todoItem: string = ''; 
  todoItemArr:any[] = [];

  // NOTED: A static tasks I've been created, feel free to delete/add them as you wish 
  board: Board = new Board('Admin Board', [
    new Column('Todo', [
      "Add 3 students",
      "Add 8 Instructors",
      "Create a new plan"
    ]),
    new Column('In-progress', [
      "Check the new messages",
      "Accept/Decline testimonials",
      
    ]),
    new Column('Done', [
      'Add a new coupon ',
     
    ]),
  ]);

  ngOnInit() {
    const savedData = localStorage.getItem('adminBoardData');
    if (savedData) {
      this.board = JSON.parse(savedData);
    }
  }
  // To save data when refresh the page 
  saveDataToLocalStorage() {
    localStorage.setItem('adminBoardData', JSON.stringify(this.board));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.saveDataToLocalStorage();
  }

  // Add a new a task
  AddTaskBtn() {
    const todoColumnIndex = 0;
    if (this.todoItem !== undefined && this.todoItem !== null) {
      this.board.columns[todoColumnIndex].tasks.push(this.todoItem);
      this.todoItem = '';
    }
    // Save data after adding a new task 
    this.saveDataToLocalStorage();
  }
  
  // delete the task after the user has been created ya helween 
  deleteTask(column: any, task: string) {    
    const columnIndex = this.board.columns.indexOf(column);
    const taskIndex = column.tasks.indexOf(task);

    if (columnIndex !== -1 && taskIndex !== -1) {
      this.board.columns[columnIndex].tasks.splice(taskIndex, 1);
    }
    // Save data after deleting a task 
    this.saveDataToLocalStorage();
  }

}



