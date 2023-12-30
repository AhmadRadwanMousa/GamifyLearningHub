import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportFilter'
})
export class ReportFilterPipe implements PipeTransform {

  transform(value: any[], searchText: string) {
    if ( searchText == '') {
      return value;
    }
    return value.filter(item => item.firsname.toUpperCase().includes(searchText.toUpperCase()))
  }
  

}



