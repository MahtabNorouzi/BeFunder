import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ListProjectsComponent} from '../../projects/list-projects/list-projects.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private test = new BehaviorSubject('default message');
  currentMessage = this.test.asObservable();
  addresses = [];
  constructor() { }

  changeMessage(message: string) {
    this.test.next(message);
  }

  setAddresses(addresses: string[]){
    this.addresses = addresses;
  }

  getAddress(i){
    return this.addresses[i];
  }

}
