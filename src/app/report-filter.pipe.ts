import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportFilter'
})
export class ReportFilterPipe implements PipeTransform {

  transform(value: any[], searchText: string) {
    if (searchText.length === 0 || searchText === '') {
      return value;
    }

    if(value == undefined || searchText == '')
    {
return value ;
    }
    console.log(value);
    
    return value.filter(item => item.Firsname.toUpperCase().includes(searchText.toUpperCase()))
  }
  }




