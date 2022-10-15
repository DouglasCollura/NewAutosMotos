import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.scss']
})
export class ResenasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptionsresena: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
        0: {
            items: 1
        },
        400: {
        items: 2
        },
        740: {
        items: 3
        },
    },
  }

  type='Todos'
}
