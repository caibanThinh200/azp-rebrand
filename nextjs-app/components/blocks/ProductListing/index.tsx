import ProductCard from "@/components/ui/ProductCard"
import Filter from "./Filter"
import { Button } from "@/components/ui/button";

const ProductList = () => {
    return <div className="flex flex-col gap-10">
        <h2 className="text-light-brown">Sản phẩm mới nhất</h2>
        <div>
            <Filter />
        </div>
        <div className="grid lg:grid-cols-4 gap-10">
            {Array(12).fill("").map((_, idx) => <ProductCard key={idx} />)}
        </div>
        <div className="flex justify-center">
            <Button className="w-1/4 bg-light-brown text-white">Xem thêm</Button>
        </div>
    </div>
}

export default ProductList;