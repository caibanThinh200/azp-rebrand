"use client";

import ProductList from "@/components/blocks/ProductListing";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { searchProductQuery } from "@/sanity/lib/queries";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Product[]>([]);

  useEffect(() => {
    const search = searchParams.get("search");
    client
      .fetch(`*[_type == "product" && title match "${search}**"]`)
      .then(setResult);
  }, [searchParams]);

  return (
    <main className="lg:container px-5 flex flex-col gap-5 lg:gap-20">
      <div className="relative">
        <h3 className="mb-10 font-light">Kết quả tìm của từ khóa: {searchParams.get("search")}</h3>
        <ProductList
          block={{
            type: "pagination",
            products: result,
            _type: "productListing",
          }}
        />
      </div>
    </main>
  );
};

export default ProductPage;
