import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  redirectHome(){
    this.route.navigate(['/home']);
  }

  redirectProjects(){
    this.route.navigate(['/listprojects']);
  }

  redirectProjectAdd(){
    this.route.navigate(['/addprojects']);
  }

  redirectProjectOwner(){
    this.route.navigate(['/projectOwner']);
  }

  redirectRegister(){
    this.route.navigate(['/register']);
  }
}