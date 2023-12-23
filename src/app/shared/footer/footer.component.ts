import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/Services/route-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}
  get shouldHide(): boolean {
    return (
      this.routeService.currentRoute.startsWith('/admin') ||
      this.routeService.currentRoute.startsWith('/Login') ||
      this.routeService.currentRoute.startsWith('/Register')
    );
  }
}
