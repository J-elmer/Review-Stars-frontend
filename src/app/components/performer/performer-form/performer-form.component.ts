import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import { Performer } from "../../../model/Performer";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'performer-form-component',
  templateUrl: './performer-form.component.html',
  styleUrls: ['./performer-form.component.css']
})
export class PerformerFormComponent implements OnInit {
  @Input() performer?: Performer;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted:  boolean = false;
  name?: string;
  age?: number;
  style?: string;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.performer) {
      this.update = true;
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
      title: 'Confirm',
      content: 'Are you sure you want to save this performer?',
      cancelOption: 'No',
      confirmOption: 'Yes'
    }} );
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.submitForm();
      }
    });
  }

  submitForm() {
    let newPerformer: Performer;
    if (!this.update) {
      newPerformer = {
        name: this.name!,
        age: this.age!,
        style: this.style!
      }
      this.submitClicked.emit(newPerformer)
    } else {
      this.submitClicked.emit(this.performer);
    }
  }

  resetForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to reset these fields?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.name = "";
        this.age = undefined;
        this.style = "";
      }
    });
  }

  discardForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to discard these changes?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.discardClicked.emit();
      }
    });
  }
}
