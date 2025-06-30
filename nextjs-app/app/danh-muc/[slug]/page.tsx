import Hero from "@/components/blocks/Hero";
import ProductList from "@/components/blocks/ProductListing";
import Filter from "@/components/blocks/ProductListing/Filter";
import { CombinedPagination } from "@/components/ui/combined-pagination";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getPaginatedProducts,
  getProductsQuery,
  getProperties,
  settingsQuery,
  singleCategoryQuery,
} from "@/sanity/lib/queries";
import { rootCategories } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Products from "./components/ProductList";
import { PaginatedProducts } from "@/types/override";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch data based on the slug
  const { data } = await sanityFetch({ query: singleCategoryQuery, params });
  const { data: siteSetting } = await sanityFetch({ query: settingsQuery });
  return {
    openGraph: {
      images:
        urlForImage(data?.image)?.url() ||
        resolveOpenGraphImage(siteSetting?.seo?.ogImage),
    },
  };
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { data } = await sanityFetch({ query: singleCategoryQuery, params });
  const { data: productResult }: { data: PaginatedProducts } =
    await sanityFetch({
      query: getPaginatedProducts,
      params: { category: data?._id, pageSize: 40, pageNumber: 1 },
    });
  const { data: properties } = await sanityFetch({ query: getProperties });
  const { data: siteSetting } = await sanityFetch({ query: settingsQuery });
  const { items: products, ...paginations } = productResult;

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
        <Products
          priceFilter={siteSetting?.productFilter}
          paginations={paginations}
          products={products}
          properties={properties}
          categoryId={data?._id as string}
        />
      </div>
    </main>
  );
};

export default CategoryPage;
