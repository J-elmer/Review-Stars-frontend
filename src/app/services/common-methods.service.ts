import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor(
    private router: Router,
  ) { }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  concertInFuture(day: Date): boolean {
    return new Date(day) > new Date;
  }

  compareTwoDates(date: Date, otherDate: Date): number {
    if (new Date(date) > new Date(otherDate)) {
      return 1;
    }
    if (new Date(date) < new Date(otherDate)) {
      return -1;
    }
    return 0;
  }

  redirectedFromAdmin(route: ActivatedRoute) {
    if (route.snapshot.url[1]) {
      return route.snapshot.url[1].path === 'admin';
    }
    return false;
  }
}
