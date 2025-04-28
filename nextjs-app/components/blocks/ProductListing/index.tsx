"use client";

import ProductCard from "@/components/ui/ProductCard";
import Filter from "./Filter";
import { Button } from "@/components/ui/button";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { sanityFetch } from "@/sanity/lib/live";
import { getProductsQuery } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";
import {
  GetProductsQueryResult,
  Product,
  ProductListing as IProductListing,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";

interface ProductListProps {
  block: Omit<IProductListing, "products"> & { products: Product[] };
}

const ProductList: React.FC<ProductListProps> = ({ block }) => {
  return (
    <div className="flex flex-col gap-10">
      {block?.title && <h2 className="text-light-brown">{block?.title}</h2>}
      {/* <div>
        <Filter />
      </div> */}
      <div className="grid lg:grid-cols-4 gap-10">
        {block?.products?.map((product, idx) => (
          <ProductCard data={product} key={idx} />
        ))}
      </div>
      <div className="flex justify-center">
        {/* {block?.type === "seeMore" ? (
          <Button className="w-1/4 bg-light-brown text-white">Xem thêm</Button>
        ) : (
          <CombinedPagination
            total={50}
            pageSize={5}
            currentPage={6}
            onPageChange={(page) => {
              console.log(page);
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default ProductList;
