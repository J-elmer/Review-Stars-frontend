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
  @Input() newPerformer!: Performer;
  @Input() updatedPerformer!: Performer;
  @Output() deleteClicked = new EventEmitter();
  @Output() saveNewPerformerClicked = new EventEmitter();
  @Output() updatePerformerClicked = new EventEmitter();

  addClicked: boolean = false;
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

  addPerformer() {
    if (this.updateClicked) {
      this.updateClicked = false;
    }
    this.addClicked = true;
  }

  updatePerformer() {
    if (this.addClicked) {
      this.addClicked = false;
    }
    this.updateClicked = true;
  }

  savePerformer(newPerformer: Performer) {
    this.addClicked = false;
    this.saveNewPerformerClicked.emit(newPerformer);
  }

  saveUpdatedPerformer(updatedPerformer: Performer) {
    this.updateClicked = false;
    this.updatePerformerClicked.emit(updatedPerformer)
  }

  deletePerformer(performerId: number) {
    this.deleteClicked.emit(performerId);
  }

  discardForm() {
    this.addClicked = false;
    this.updateClicked = false;
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
