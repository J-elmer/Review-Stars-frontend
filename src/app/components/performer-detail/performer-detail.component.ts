import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router} from "@angular/router";

import { Performer } from "../../model/Performer";

@Component({
  selector: 'app-performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.css']
})
export class PerformerDetailComponent implements OnInit {
  @Input() performer!: Performer;
  @Output() btnClicked = new EventEmitter();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  showReviews() {
    console.log("reviews");
  }

  showConcerts() {
    console.log("concerts");
  }

  deletePerformer(performerId: number) {
    this.btnClicked.emit(performerId);
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
