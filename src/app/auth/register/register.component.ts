import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../core/models/user';
import {TokenaAddressService} from '../../core/services/hashMap.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addActionForm: FormGroup;
  loading = false;
  returnUrl: string;
  usename: string;
  user = new User();


  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenMode: TokenaAddressService) { }

  ngOnInit() {
    this.addActionForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      // userMode: new FormControl('', Validators.required),
      ethAddress: new FormControl('', Validators.required)
     });
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  submit(): void {
    // console.log(this.addActionForm.value)
    if (this.addActionForm.invalid) {
      return;
    }
    this.user.password = this.addActionForm.value.password;
    this.user.username = this.addActionForm.value.username;
    this.user.fullName = this.addActionForm.value.fullName;
    var e = (document.getElementById("userMode")) as HTMLSelectElement;
    this.user.userMode = e.options[e.selectedIndex].text;
console.log(this.user.userMode)

    // this.user.userMode = this.addActionForm.value.userMode;
    this.user.ethAddress = this.addActionForm.value.ethAddress;

    this.loading = true;
  
    this.auth.register(this.user)
      .pipe(first())
      .subscribe(
        data => {
          // this.tokenMode.setPHashMap(this.user.username, this.user.userMode);
          // console.log(this.tokenMode.myPHash)
          this.router.navigate([this.returnUrl], {
            replaceUrl: true,
          });
        },
        error => {
          this.loading = false;
        });
  }

}