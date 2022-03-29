import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { Performer } from "../../model/Performer";

@Component({
  selector: 'performer-form-component',
  templateUrl: './performer-form.component.html',
  styleUrls: ['./performer-form.component.css']
})
export class PerformerFormComponent implements OnInit {
  update: boolean = false;
  submitted:  boolean = false;
  performer!: Performer;
  name?: string;
  age?: number;
  style?: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes("update")) {
      this.update = true;
    }
  }

  onSubmit() {
    this.submitted = true;
  }

  addPerformer() {
    console.log("OKE");
  }

  resetForm() {
    console.log("OKE");
  }
}
