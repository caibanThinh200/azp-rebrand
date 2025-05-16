import { Product } from "@/sanity.types";

export interface PaginatedProducts {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  total: number;
  items: Product[];
}
