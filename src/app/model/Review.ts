export interface Review {
  id?: string;
  concertId?: number;
  performerId?: number;
  authorName?: string;
  dateOfReview?: Date;
  numberOfStars?: number;
  reviewText?: string;
}
