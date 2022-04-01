import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

import { Performer } from "../../../model/Performer";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.css']
})
export class PerformerDetailComponent implements OnInit {
  @Input() performer!: Performer;
  @Output() deleteClicked = new EventEmitter();
  @Output() updatePerformerClicked = new EventEmitter();

  updateClicked: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  showReviews(): void {
    console.log("reviews");
  }

  showConcerts(): void {
    console.log("concerts");
  }

  updatePerformer(): void {
    this.updateClicked = !this.updateClicked;
  }

  saveUpdatedPerformer(updatedPerformer: Performer): void {
    this.updateClicked = false;
    this.updatePerformerClicked.emit(updatedPerformer);
  }

  deletePerformer(performerId: number): void {
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

  discardForm(): void {
    this.updateClicked = false;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
}
