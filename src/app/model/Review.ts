export interface Review {
  id?: string;
  concertId: number;
  performerId: number;
  authorName: string;
  dateTimeOfReview: Date;
  numberOfStars: number;
  reviewText: string;
}
