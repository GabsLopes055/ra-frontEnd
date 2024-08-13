import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  _title = new BehaviorSubject<string>("");

  constructor() { }

  get title(): Observable<string> {
    return this._title;
  }

  setTitle(title: string) {
    this._title.next(title)
  }
}
