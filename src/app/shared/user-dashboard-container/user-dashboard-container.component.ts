import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-dashboard-container',
  templateUrl: './user-dashboard-container.component.html',
  styleUrls: ['./user-dashboard-container.component.scss']
})
export class UserDashboardContainerComponent {
  token: string | null = localStorage.getItem('token');
  getUserIdFromToken(): number{
    if(this.token != null){
      let decodedToken: any = jwtDecode(this.token);
      return decodedToken.userId;
    }
    else{
      return 0;
    }
  }
}
