import Hero from "@/components/blocks/Hero";
import ProductList from "@/components/blocks/ProductListing";
import { sanityFetch } from "@/sanity/lib/live";
import { getProductDetailQuery } from "@/sanity/lib/queries";

const ProductPage = async () => {

  return (
    <main className="lg:container px-5 flex flex-col gap-5 lg:gap-20">
      <Hero />
      <ProductList listWidget="pagination" />
    </main>
  );
};

export default ProductPage;
