import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Performer } from "../../../model/Performer";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import { Validator} from "@angular/forms";

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
  submitted:  boolean = false;
  form!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required
        ]]
      ,
      age: [undefined, [
        Validators.min(1)
      ]],
      style: ['', [
        Validators.required]
        ],
    });

    if (this.performer.id) {
      this.update = true;
    }
  }

  getName() {
    return this.form.get('email');
  }

  getAge() {
    return this.form.get('age');
  }

  getStyle() {
    return this.form.get('style');
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
    this.submitClicked.emit(this.form.value);
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
        this.performer.name = "";
        this.performer.age = undefined;
        this.performer.style = "";
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
