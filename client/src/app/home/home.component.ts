import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [{'image': 'assets/sliders/slider1.jpg'}, 
  {'image': 'assets/sliders/slider4.jpg'},
  {'image': 'assets/sliders/slider1.jpg'}];
  constructor() { }

  ngOnInit() {
  }

  
}
