import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface IHash {
  [details: string]: string[];
}

export interface PHash {
  [details: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenaAddressService {

  constructor() { }

  myhash: IHash = {}; 
  
  myPHash: PHash = {}

  setPHashMap(address:string, balance: string) {
    this.myPHash[address] = balance;
  }

  getPHashMap(address: string) {
    return this.myPHash[address];
  }

  setHashMap(lender:string, project: string) {
    let arr = this.myhash[lender];
    if (this.myhash[lender] == undefined)
    {
      arr = []
    }
      arr.push(project);
      this.myhash[lender] = arr;
  }
  getHashMap(lender: string) {
    return this.myhash[lender];
  }

}