import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router} from "@angular/router";

import { Performer } from "../../model/Performer";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
    public dialog: MatDialog,
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
    this.updateClicked = !this.updateClicked;
  }

  saveUpdatedPerformer(updatedPerformer: Performer) {
    this.updateClicked = false;
    this.updatePerformerClicked.emit(updatedPerformer)
  }

  deletePerformer(performerId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to delete this performer?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }} );
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteClicked.emit(performerId);
      }
    });
  }

  discardForm() {
    this.updateClicked = false;
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
