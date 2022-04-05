import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Performer} from "../../../model/Performer";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'performer-form-component',
  templateUrl: './performer-form.component.html',
  styleUrls: ['./performer-form.component.css']
})
export class PerformerFormComponent implements OnInit {
  @Input() performer!: Performer;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted: boolean = false;
  performerForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.performerForm = this.formBuilder.group({
      name: [this.performer.name, [
        Validators.required
      ]]
      ,
      age: [this.performer.age, [
        Validators.min(1),
        Validators.required,
      ]],
      style: [this.performer.style, [
        Validators.required]
      ],
    });

    if (this.performer.id) {
      this.update = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.performerForm.invalid) {
      setTimeout(() => this.submitted = false, 10000);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content: 'Are you sure you want to save this performer?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.submitForm();
      }
      if (result == false) {
        this.submitted = false;
      }
    });

  }

  submitForm() {
    this.submitClicked.emit(this.performerForm.value);
  }

  resetForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content: 'Are you sure you want to reset these fields?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.performerForm.reset();
      }
    });
  }

  discardForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content: 'Are you sure you want to discard these changes?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.discardClicked.emit();
      }
    });
  }
}
