import Image from "next/image"
import { Button } from "./button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

const ProductCard = () => {
    return <Link href={"/"} className="p-5 bg-white shadow-xl rounded-xl block">
        <Image src={"/images/placeholder-1.png"} alt="Product" width={200} height={200} className="w-full h-[200px] object-cover rounded-xl" />
        <div className="mt-5 flex flex-col gap-5">
            <p className="text-xl">BÀN TRÀ NEW MINESOTA</p>
            <p className="line-through text-grey">10.000.000 VND</p>
            <p className="text-light-brown text-lg font-bold">8.500.000 VND</p>
            <Button variant={"secondary"} className="flex gap-2 items-center">
                <ShoppingCart />
                Thêm vào giỏ hàng
            </Button>
            <Button>Thanh toán</Button>
        </div>
    </Link>
}

export default ProductCard