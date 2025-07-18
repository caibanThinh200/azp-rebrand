"use client";

import ProductCard from "@/components/ui/ProductCard";
import { Product, ProductListing as IProductListing } from "@/sanity.types";

interface ProductListProps {
  block: Omit<IProductListing, "products"> & { products: Product[] };
}

const ProductList: React.FC<ProductListProps> = ({ block }) => {
  if ((block?.products || [])?.length == 0) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-4">
      {block?.title && <h2 className="text-light-brown">{block?.title}</h2>}
      {/* <div>
        <Filter />
      </div> */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 lg:gap-5">
        {block?.products?.map((product) => (
          <ProductCard data={product} key={product?._id} />
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
