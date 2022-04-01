import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  showPerformers: boolean = false;
  showConcerts: boolean = false;
  showReviews: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showPerformersClicked(): void {
    if (this.showConcerts || this.showReviews) {
      this.showConcerts = false;
      this.showReviews = false;
    }
    this.showPerformers = !this.showPerformers;
  }

  showConcertsClicked(): void {
    if (this.showPerformers || this.showReviews) {
      this.showPerformers = false;
      this.showReviews = false;
    }
    this.showConcerts = !this.showConcerts;
  }

  showReviewsClicked(): void {
    if (this.showConcerts || this.showPerformers) {
      this.showConcerts = false;
      this.showPerformers = false;
    }
    this.showReviews = !this.showReviews;
  }

}
