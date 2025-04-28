"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/cart";
import { cn, formatVND } from "@/lib/utils";
import { GetProductDetailQueryResult, Product } from "@/sanity.types";
import { Label } from "@radix-ui/react-label";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductMetaInformationProps {
  data: GetProductDetailQueryResult;
}

type ColorOption = {
  id: string;
  value: string;
  label: string;
  className: string;
};

const colorOptions: ColorOption[] = [
  {
    id: "black",
    value: "black",
    label: "Black",
    className: "bg-black",
  },
  {
    id: "brown",
    value: "brown",
    label: "Brown",
    className: "bg-amber-800",
  },
  {
    id: "gray",
    value: "gray",
    label: "Gray",
    className: "bg-gray-400",
  },
];

const ProductMetaInformation: React.FC<ProductMetaInformationProps> = ({
  data,
}) => {
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
    addItem(data as Product);
    setCartAdded(true);
  };

  const handlePayment = () => {
    addItem(data as Product);
    router.push("/gio-hang");
  };

  return (
    <div className="flex flex-col gap-6 col-span-2 p-10 shadow-lg rounded-20 bg-white">
      <h1 className="font-bold text-heading-1">{data?.title}</h1>

      <div className="flex items-center gap-2">
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

      <p className="text-gray-700 whitespace-pre-line text-sm">{data?.description}</p>

      {/* <ul className="space-y-2 text-gray-700">
        <li>Premium leather upholstery</li>
        <li>Ergonomic lumbar support</li>
        <li>Adjustable height and tilt</li>
        <li>360-degree swivel</li>
        <li>Heavy-duty base with smooth-rolling casters</li>
      </ul> */}

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Màu sắc</h3>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex gap-3"
        >
          {colorOptions.map((option) => (
            <div key={option.id} className="flex flex-col items-center">
              <Label htmlFor={option.id} className="cursor-pointer">
                <div
                  className={`w-10 h-10 rounded-full ${option.className} border-2 ${selectedColor === option.value ? "border-primary" : "border-transparent"}`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.id}
                    className="sr-only"
                  />
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          Lưu ý: Giá chưa bao gồm thuế GTGT 10%
          <br />
          Giá sản phẩm có thể thay đổi dựa vào chất liệu
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Số lượng</h3>
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

      <div className="flex gap-5 items-center">
        <Button
          onClick={handleAddCart}
          variant={"secondary"}
          className={cn("flex gap-2 items-center", cartAdded && "bg-green/50")}
        >
          {cartAdded ? <Check className="text-green" /> : <ShoppingCart />}
          {cartAdded ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
        </Button>
        <Button
          onClick={handlePayment}
          className="w-1/4 bg-light-brown text-white hover:bg-light-brown/90"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default ProductMetaInformation;
