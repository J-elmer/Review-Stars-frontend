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
  @Input() updatedPerformer!: Performer;
  @Output() deleteClicked = new EventEmitter();
  @Output() updatePerformerClicked = new EventEmitter();

  updateClicked: boolean = false;

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


  updatePerformer() {
    this.updateClicked = true;
  }

  saveUpdatedPerformer(updatedPerformer: Performer) {
    this.updateClicked = false;
    this.updatePerformerClicked.emit(updatedPerformer)
  }

  deletePerformer(performerId: number) {
    this.deleteClicked.emit(performerId);
  }

  discardForm() {
    this.updateClicked = false;
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
