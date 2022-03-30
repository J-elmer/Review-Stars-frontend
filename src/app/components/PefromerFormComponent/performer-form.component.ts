import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Performer } from "../../model/Performer";

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
  ) { }

  ngOnInit(): void {
    if (this.performer) {
      this.update = true;
    }
  }

  onSubmit() {
    this.submitted = true;
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
    this.name = "";
    this.age = undefined;
    this.style = "";
  }

  discardForm() {
    this.discardClicked.emit();
  }
}
