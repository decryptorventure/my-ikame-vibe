export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
