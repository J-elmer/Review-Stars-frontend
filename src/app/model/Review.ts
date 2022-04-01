export interface Review {
  id?: string;
  concertId: number;
  performerId: number;
  authorName: string;
  dateTimeOfReview?: string;
  numberOfStars: number;
  reviewText: string;
}
