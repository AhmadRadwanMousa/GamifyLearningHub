import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-page-categories.component.html',
  styleUrls: ['./home-page-categories.component.scss'],
})
export class HomePagePrograms implements OnInit {
  constructor(public _sharedService: SharedService) {}

  ngOnInit(): void {
    this._sharedService.GetAllPlansWithPrograms();
  }

  categoriesSlides: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 30,
    navText: [
      "<i class='bx bx-left-arrow-alt'></i>",
      "<i class='bx bx-right-arrow-alt'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
}
