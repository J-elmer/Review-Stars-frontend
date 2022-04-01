import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
