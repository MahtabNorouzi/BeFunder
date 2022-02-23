import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {TokenaAddressService} from '../../core/services/hashMap.service';


const Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
export interface IHash {
  [details: string]: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  addActionForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenAddress: TokenaAddressService,
    private zone: NgZone) { }

  ngOnInit() {
    this.addActionForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
     });     
  }


  
  submit(): void {
    // console.log(this.addActionForm.value.username)
    if (this.addActionForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(this.addActionForm.value.username, this.addActionForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          web3.eth.getAccounts((err,acc)=>{
            if(err){
                console.log('error............',err);
            }
            // console.log(this.auth.instantUser.userMode)
            this.zone.run(() => {
              if(this.auth.instantUser.userMode == "Borrower"){
                this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/borrowermain'],
                {
               replaceUrl: true,
             });
              }
            });
           
            this.zone.run(() => {
            if(this.auth.instantUser.userMode == "Buyer"){
              this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/buyermain'],
              {
             replaceUrl: true,
           });
            }
          });

            if(this.auth.instantUser.userMode == "Lender"){
              this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/listprojects'],
              {
             replaceUrl: true,
           });
            }
          });          
        },
        error => {
          this.loading = false;
          console.log("you're not registered!")
        });
        }

  logout(){
    console.log("logout")
    this.auth.logout()
  }

}