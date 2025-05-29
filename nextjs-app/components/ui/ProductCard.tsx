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
import FallbackImage from "./fallback-image";

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
      className="p-5 bg-white shadow-xl rounded-xl block relative"
    >
      <FallbackImage
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

      <div className="mt-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="line-clamp-3">{data?.productId}</p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              return handleAddCart(data);
            }}
            variant={"secondary"}
            className={cn(
              "flex gap-2 items-center z-20 size-10 rounded-full bg-light-brown",
              cartAdded && "bg-green/50"
            )}
          >
            <ShoppingCart />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="line-through text-grey">
            {formatVND(data?.originPrice)}
          </p>
          <p className="text-light-brown text-lg font-bold">
            {formatVND(data?.discountPrice)}
          </p>
        </div>

        {/* <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            return handlePayment(data);
          }}
        >
          Thanh toán
        </Button> */}
      </div>
    </Link>
  );
};

export default ProductCard;
