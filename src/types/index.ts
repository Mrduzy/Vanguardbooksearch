export interface AuthorReview {
  id: string;
  fullName: string;
  email: string;
  authorWebsite?: string;
  bookTitle?: string;
  genre?: string;
  servicesUsed: string[];
  rating: number;
  writtenFeedback: string;
  displayName: string;
  authorPhotoUrl?: string;
  consentToPublish: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  bookOrWebsite?: string;
  createdAt: string;
  isRead: boolean;
}
