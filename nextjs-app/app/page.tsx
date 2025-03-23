import CategoriesGrid from "@/components/blocks/CategoriesGrid";
import ProductSwiper from "@/components/blocks/DiscoutProduct";
import Hero from "@/components/blocks/Hero";
import Process from "@/components/blocks/Process";
import ProductList from "@/components/blocks/ProductListing";
import Quote from "@/components/blocks/Quote";
import FadeInView from "@/components/ui/FadeInView";

export default async function Page() {
  return (
    <main className="lg:container px-5 flex flex-col gap-5 lg:gap-20">
      <FadeInView>
        <Hero />
      </FadeInView>
      <FadeInView>
        <CategoriesGrid />
      </FadeInView>
      <FadeInView>
        <Quote />
      </FadeInView>
      <FadeInView>
        <ProductSwiper />
      </FadeInView>
      <FadeInView>
        <ProductList />
      </FadeInView>
      <FadeInView>
        <Process />
      </FadeInView>
    </main>
  );
}
