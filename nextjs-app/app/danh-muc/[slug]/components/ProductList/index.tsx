"use client";

import ProductList from "@/components/blocks/ProductListing";
import Filter from "@/components/blocks/ProductListing/Filter";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { Product } from "@/sanity.types";
import { useCallback, useState } from "react";

interface ProductListProps {
  products: Array<Product>;
}

const Products: React.FC<ProductListProps> = ({ products }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 50,
    pageSize: 10,
  });

  const handlePagination = useCallback((page: number) => {
    setPagination({ ...pagination, currentPage: page });
  }, []);

  return (
    <div>
      <Filter />
      <div className="p-10 bg-[#C1C1BD] rounded-20 mt-10">
        <ProductList
          block={{ type: "pagination", products, _type: "productListing" }}
        />
      <CombinedPagination {...pagination} onPageChange={handlePagination} />
      </div>
    </div>
  );
};

export default Products;
