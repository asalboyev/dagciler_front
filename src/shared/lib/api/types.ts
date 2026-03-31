export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  links?: PaginationLinks;
}

export interface ApiImage {
  lg: string | null;
  md: string | null;
  sm: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta?: PaginationMeta;
  links?: PaginationLinks;
}

/** Actual flat pagination envelope returned by this API */
export interface FlatPaginatedResponse<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
