import { Component, OnInit, Input } from '@angular/core';
import { Router} from "@angular/router";

import { Performer } from "../../model/Performer";

@Component({
  selector: 'app-performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.css']
})
export class PerformerDetailComponent implements OnInit {
  @Input() performer!: Performer;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showReviews() {
    console.log("reviews");
  }

  showConcerts() {
    console.log("concerts");
  }

  updatePerformer() {
    console.log("update performer");
  }

  deletePerformer() {
    console.log("delete performer");
  }

  addPerformer() {
    console.log("add performer");
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
