import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DeadlineData } from "../interface/deadline";

@Injectable({providedIn: 'root'})
export class DeadlineService {

  public getDeadline(): Observable<DeadlineData> {

    const number = Math.floor(Math.random() * 100);

    return of({ secondsLeft: number })
  }
}
