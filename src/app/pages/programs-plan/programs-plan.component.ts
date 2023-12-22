import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-programs-plan',
  templateUrl: './programs-plan.component.html',
  styleUrls: ['./programs-plan.component.scss']
})
export class ProgramsPlanComponent {
  constructor(public _sharedService: SharedService , private route: ActivatedRoute) {}

  planId: number = 0
  ngOnInit(){
    this.route.paramMap.subscribe(
  param => this.planId = Number(param.get('id'))
    )
    this._sharedService.GetAllProgramsWithPlanId(this.planId);
    
  }

  
  searchText : string = '';
  selectedSortOption: string = 'default';
  Search(){

    if (this.searchText == ''){
      this._sharedService.searchprograms = this._sharedService.programswithplanId;
    }
    else {
      this._sharedService.searchprograms = this._sharedService.programswithplanId.filter((x:any)=> x.programName.toUpperCase().includes(this.searchText.toUpperCase()));

    }
  }


  onSortOptionChange() {
   if(this.selectedSortOption == 'default'){
    this._sharedService.searchprograms = this._sharedService.programswithplanId;
   }
   else if (this.selectedSortOption === 'popularity') {
    this._sharedService.searchprograms = this._sharedService.programswithplanId.slice(); 
  
    this._sharedService.searchprograms.sort((a:any, b :any) => {
      return b.numberOfUsers - a.numberOfUsers;
    });
  }
  
  else if (this.selectedSortOption === 'latest') {
    this._sharedService.searchprograms = this._sharedService.programswithplanId.slice(); 
  
    this._sharedService.searchprograms.sort((a:any, b :any) => {
      return b.programId - a.programId;
    });
  }
  
  else if (this.selectedSortOption === 'cheapest') {
    this._sharedService.searchprograms = this._sharedService.programswithplanId.slice(); // Create a shallow copy
  
    this._sharedService.searchprograms.sort((a: any, b: any) => {
      const costA = a.programPrice - (a.programPrice * a.programSale / 100);
      const costB = b.programPrice - (b.programPrice * b.programSale / 100);
  
      return costA - costB;
    });
  }
  
  else if (this.selectedSortOption === 'expensive') {
    this._sharedService.searchprograms = this._sharedService.programswithplanId.slice(); // Create a shallow copy
  
    this._sharedService.searchprograms.sort((a: any, b: any) => {
      const costA = a.programPrice - (a.programPrice * a.programSale / 100);
      const costB = b.programPrice - (b.programPrice * b.programSale / 100);
  
      return costB - costA;
    });
  }
  
  
  
   
  
  }

}
