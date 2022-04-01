export interface Review {
  id?: string;
  concertId: number;
  performerId: number;
  authorName: string;
  dateTimeOfReview: number;
  numberOfStars: number;
  reviewText: string;
}
