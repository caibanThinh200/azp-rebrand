"use client";

import ProductList from "@/components/blocks/ProductListing";
import Filter from "@/components/blocks/ProductListing/Filter";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { GetPropertiesResult, Product, Settings } from "@/sanity.types";
import { PaginatedProducts } from "@/types/override";
import { Loader, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { removeEmptyObject } from "@/lib/utils";

interface ProductListProps {
  paginations: Omit<PaginatedProducts, "items">;
  products: Array<Product>;
  properties: GetPropertiesResult;
  categoryId: string;
  priceFilter: Settings["productFilter"];
}

const Products: React.FC<ProductListProps> = ({
  products,
  properties,
  paginations,
  categoryId,
  priceFilter,
}) => {
  const [result, setResult] = useState<PaginatedProducts>({
    ...paginations,
    items: products,
  });
  const [pagination, setPagination] = useQueryStates({
    pageSize: parseAsInteger.withDefault(paginations?.pageSize),
    currentPage: parseAsInteger.withDefault(paginations?.currentPage),
    total: parseAsInteger.withDefault(paginations.total),
  });
  const [filterParams, setFilterParams] = useQueryStates({
    ...properties?.reduce(
      (prev, curr) => ({
        ...prev,
        [curr._id]: parseAsString.withDefault(""),
      }),
      {}
    ),
    min: parseAsInteger.withDefault(0),
    max: parseAsInteger.withDefault(0),
    search: parseAsString.withDefault(""),
  });
  const [loading, setLoading] = useState(false);

  const handleFetchProduct = async () => {
    setLoading(true);
    const params = {
      pageSize: pagination.pageSize.toString(),
      pageNumber: pagination.currentPage.toString(),
      category: categoryId,
      ...removeEmptyObject(filterParams),
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
        filter[key] = "";
        delete (filterParams as any)[key];
      }
    });
    setFilterParams({ ...filterParams, ...filter });
  };

  return (
    <div>
      <Filter
        priceFilter={priceFilter}
        filters={filterParams as any}
        handleUpdateFilter={handleUpdateFilter}
        properties={properties}
      />
      <h2 className="flex gap-2 items-center text-xl mt-10 text-[#133955]">
        <Package />
        Danh sách sản phẩm ({result?.total} kết quả)
      </h2>
      <div className="p-10 bg-[#C1C1BD] rounded-20 mt-5 relative overflow-hidden">
        {loading && (
          <div className="absolute -m-10 z-10 bg-white/50 size-full grid place-items-center">
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
        <CombinedPagination
          {...pagination}
          total={result?.total}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default Products;
