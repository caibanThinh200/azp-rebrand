import Hero from "@/components/blocks/Hero"
import ProductList from "@/components/blocks/ProductListing"

const ProductPage = () => {
    return <main className="lg:container px-5 flex flex-col gap-5 lg:gap-20">
        <Hero />
        <ProductList />
    </main>
}

export default ProductPage;