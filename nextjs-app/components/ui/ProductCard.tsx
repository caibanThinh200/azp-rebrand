import Image from "next/image";
import { Button } from "./button";
import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { GetProductsQueryResult, Product } from "@/sanity.types";
import { cn, formatVND } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/utils";
import { useCart } from "@/context/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: GetProductsQueryResult[number];
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { addItem } = useCart();
  const router = useRouter();
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddCart = (product: Product) => {
    addItem(product);
    setCartAdded(true);
  };

  const handlePayment = (product: Product) => {
    addItem(product);
    router.push("/gio-hang");
  };

  return (
    <Link
      href={`/san-pham/${data?.slug?.current}`}
      className="p-5 bg-white shadow-xl rounded-xl block"
    >
      <Image
        src={
          (urlForImage(
            ((data?.images as GetProductsQueryResult[number]["images"]) ||
              [])[0]
          )?.url() as string) || ""
        }
        alt="Product"
        width={200}
        height={200}
        className="w-full h-[200px] object-contain rounded-xl"
      />
      <div className="mt-5 flex flex-col gap-5">
        <p className="line-clamp-3">{data?.title}</p>
        <p className="line-through text-grey">{formatVND(data?.originPrice)}</p>
        <p className="text-light-brown text-lg font-bold">
          {formatVND(data?.discountPrice)}
        </p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            return handleAddCart(data);
          }}
          variant={"secondary"}
          className={cn("flex gap-2 items-center", cartAdded && "bg-green/50")}
        >
          {cartAdded ? <Check className="text-green" /> : <ShoppingCart />}
          {cartAdded ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            return handlePayment(data);
          }}
        >
          Thanh toán
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
