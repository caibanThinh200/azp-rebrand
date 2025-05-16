"use client";

import ProductList from "@/components/blocks/ProductListing";
import Filter from "@/components/blocks/ProductListing/Filter";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { GetPropertiesResult, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { getPaginatedProducts } from "@/sanity/lib/queries";
import { PaginatedProducts } from "@/types/override";
import { Loader, Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ProductListProps {
  paginations: Omit<PaginatedProducts, "items">;
  products: Array<Product>;
  properties: GetPropertiesResult;
  categoryId: string;
}

const Products: React.FC<ProductListProps> = ({
  products,
  properties,
  paginations,
  categoryId,
}) => {
  const [result, setResult] = useState<PaginatedProducts>({
    ...paginations,
    items: products,
  });
  const [pagination, setPagination] = useState(paginations);
  const [filterParams, setFilterParams] = useState<{ [x: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleFetchProduct = async () => {
    setLoading(true);
    const params = {
      pageSize: pagination.pageSize.toString(),
      pageNumber: pagination.currentPage.toString(),
      category: categoryId,
      ...filterParams,
    };

    const searchParams = new URLSearchParams(params).toString();

    const filteredResult: PaginatedProducts = await fetch(
      `/api/products?${searchParams}`
    )
      .then((res) => res.json())
      .finally(() => setLoading(false));
    setResult(filteredResult);
  };

  useEffect(() => {
    setResult({ ...result, items: products });
  }, [products]);

  useEffect(() => {
    handleFetchProduct();
  }, [pagination, filterParams]);

  const handlePagination = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleUpdateFilter = (filter: { [x: string]: string }) => {
    Object.keys(filter).forEach((key) => {
      if (!filter[key]) {
        delete filter[key];
        delete filterParams[key];
      }
    });
    setFilterParams({ ...filterParams, ...filter });
  };

  return (
    <div>
      <Filter
        filters={filterParams}
        handleUpdateFilter={handleUpdateFilter}
        properties={properties}
      />
      <h2 className="flex gap-2 items-center text-xl mt-10 text-[#133955]">
        <Package />
        Danh sách sản phẩm ({result?.total} kết quả)
      </h2>
      <div className="p-10 bg-[#C1C1BD] rounded-20 mt-5 relative">
        {loading && (
          <div className="absolute z-10 bg-white/50 size-full grid place-items-center">
            <Loader className="animate-spin" />
          </div>
        )}
        {!loading && result?.items?.length === 0 ? (
          <div className="size-full grid place-items-center">
            <div className="flex flex-col gap-5 my-10 items-center">
              <Package size={100} strokeWidth={0.5} />
              <p className="font-bold">Sản phẩm này hiện chưa có sẵn</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <ProductList
              block={{
                type: "pagination",
                products: result.items,
                _type: "productListing",
              }}
            />
          </div>
        )}
        <CombinedPagination {...pagination} onPageChange={handlePagination} />
      </div>
    </div>
  );
};

export default Products;
