import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): String[] {
    return ['1', '2'];
  }

  submitProject(): void {
    console.log('project submited')
  }
}
