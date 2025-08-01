export interface PaginationResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  content: T[];
}