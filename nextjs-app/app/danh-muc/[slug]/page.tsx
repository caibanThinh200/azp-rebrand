import Hero from "@/components/blocks/Hero";
import ProductList from "@/components/blocks/ProductListing";
import Filter from "@/components/blocks/ProductListing/Filter";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { sanityFetch } from "@/sanity/lib/live";
import { getProductsQuery, singleCategoryQuery } from "@/sanity/lib/queries";
import { rootCategories } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Products from "./components/ProductList";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await sanityFetch({ query: singleCategoryQuery, params });
  const { data: products } = await sanityFetch({
    query: getProductsQuery,
    params: { category: data?._id },
  });

  return (
    <main className="lg:container px-5">
      {data?.image && (
        <div className="rounded-20 overflow-hidden mb-10">
          <Image
            className="size-full object-cover object-top max-h-[350px]"
            src={urlForImage(data?.image)?.url() || ""}
            alt={`Image ${data?._id}`}
            width={data?.image?.hotspot?.width || 1000}
            height={data?.image?.hotspot?.height || 300}
          />
        </div>
      )}
      <div>
        <Products products={products} />
      </div>
    </main>
  );
};

export default CategoryPage;
