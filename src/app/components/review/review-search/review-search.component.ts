import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent implements OnInit {
  reviews$!: Observable<Review[]>;
  searchResult: Review[] = [];
  searchFinished: boolean = false;

  private searchTerms = new Subject<string>();

  constructor(
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.reviews$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.reviewService.searchReviews(term))
    )
    this.reviews$.subscribe(reviews => {
      this.searchResult = reviews;
      this.searchFinished = true;
    });
    let element = document.querySelectorAll(".modal");
    M.Modal.init(element);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
