"use client";

import { GetProductDetailQueryResult, Product } from "@/sanity.types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { FreeMode, Thumbs, Navigation } from "swiper/modules";
import FallbackImage from "@/components/ui/fallback-image";
import { urlForImage } from "@/sanity/lib/utils";
import { cn, formatVND } from "@/lib/utils";
import { useCart } from "@/context/cart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, LucideShoppingCart, Minus, Plus } from "lucide-react";
import ProductTabs from "./InformationTabs";

interface ProductDetailMobileProps {
  data: GetProductDetailQueryResult;
  note: string;
}

const ProductDetailMobile: React.FC<ProductDetailMobileProps> = ({
  data,
  note,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { addItem } = useCart();
  const router = useRouter();
  const [cartAdded, setCartAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddCart = () => {
    addItem({ ...data, color: selectedColor } as Product & { color: string });
    setCartAdded(true);
  };

  const handlePayment = () => {
    addItem({ ...data, color: selectedColor } as Product & { color: string });
    router.push("/gio-hang");
  };

  return (
    <div className="lg:hidden">
      <div className="flex flex-col gap-5 mb-5 border rounded-20 overflow-hidden bg-white p-3 shadow-lg">
        <h1>{data?.title}</h1>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product-swiper w-full rounded-20"
        >
          {data?.images?.map((image) => (
            <SwiperSlide key={image._key as string}>
              <div className="aspect-square relative size-full h-auto min-h-[300px]">
                <FallbackImage
                  src={urlForImage(image)?.url() as string}
                  alt={`image ${image?._key}` as string}
                  width={image?.hotspot?.width || 300}
                  height={image?.hotspot?.height || 300}
                  className="object-cover w-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-wrap items-center gap-2">
          {data?.originPrice && (
            <span className="text-gray-500 line-through text-xl">
              {formatVND(data?.originPrice)}
            </span>
          )}
          {data?.discountPrice && (
            <span className="text-red-500 text-2xl font-semibold">
              {formatVND(data?.discountPrice)}
            </span>
          )}
        </div>
        <p className="text-gray-700 whitespace-pre-line text-sm">
          {data?.description}
        </p>
        {(data?.colors || [])?.length > 0 && (
          <div className="flex gap-3 items-center">
            <h3 className="font-semibold text-lg">Màu sắc:</h3>
            <RadioGroup
              value={selectedColor}
              onValueChange={setSelectedColor}
              className="flex gap-3"
            >
              {(data?.colors || []).map((color) => (
                <RadioGroupItem
                  key={color}
                  value={color}
                  // className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                >
                  <span className="font-semibold tracking-tight">{color}</span>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </div>
        )}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            {data?.note ||
              note ||
              "Lưu ý: Giá chưa bao gồm thuế GTGT & Phí Vận Chuyển, Phí Lắp Đặt nếu có."}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <h3 className="font-semibold text-lg">Số lượng:</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseQuantity}
              className="rounded-full h-10 w-10"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
              className="rounded-full h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleAddCart}
            variant={"secondary"}
            className={cn(
              "flex gap-2 items-center flex-1",
              cartAdded && "bg-green/50"
            )}
          >
            {cartAdded ? (
              <Check className="text-green" />
            ) : (
              <LucideShoppingCart />
            )}
            {cartAdded ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
          </Button>
          <Button
            onClick={handlePayment}
            className="flex-1 bg-light-brown text-white hover:bg-light-brown/90"
          >
            Thanh toán
          </Button>
        </div>
      </div>
      <ProductTabs content={data?.content} properties={data?.properties} />
      {/* <div className="flex flex-col gap-5 border rounded-20 overflow-hidden bg-white p-3 shadow-lg"></div> */}
    </div>
  );
};

export default ProductDetailMobile;
