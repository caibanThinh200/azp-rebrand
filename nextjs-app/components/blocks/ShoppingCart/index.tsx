import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart";
import { urlForImage } from "@/sanity/lib/utils";
import { formatVND } from "@/lib/utils";
import { ShoppingCart as IShoppingCart } from "@/sanity.types";
import Link from "next/link";

// Define types for our cart items
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface ShoppingCartProps {
  block: IShoppingCart;
}

export default function ShoppingCart({ block }: ShoppingCartProps) {
  // Initial cart items
  const { items, subtotal, total, updateQuantity, removeItem } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Shipping cost
  const shipping = 100000;

  // Tax calculation (assuming 8%)
  const tax = subtotal * 0.08;

  // Discount (10% if promo applied)
  const discount = promoApplied ? subtotal * 0.1 : 0;

  // Function to apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
    }
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-8">{block?.title}</h1> */}

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Sản phẩm</h2>
          <p className="text-gray-500 mb-6">
            Hãy quay lại để tìm thêm món đồ ưng ý
          </p>
          <Link href={"/"}>
            <Button className="bg-light-brown">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items - Left Side */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá sản phẩm</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Tổng</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src={
                            urlForImage((item?.images || [])[0])?.url() ||
                            "/placeholder.svg"
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm text-gray-900 line-clamp-2">
                          {item.title}
                        </p>
                        {item?.color && (
                          <p className="text-sm">
                            Màu sắc:{" "}
                            <span className="font-bold">{item?.color}</span>
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-sm text-red-500 mt-1 flex items-center"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Xóa
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-sm text-gray-500">
                        Giá:
                      </span>
                      <span className="text-gray-900">
                        {formatVND(item.discountPrice)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-sm text-gray-500">
                        Số lượng:
                      </span>
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="p-2 text-gray-600 hover:text-gray-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-center w-10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-2 text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between md:text-right">
                      <span className="md:hidden text-sm text-gray-500">
                        Subtotal:
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatVND(item.discountPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-6">Thông tin đơn hàng</h2>
              {/* Summary Details */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng cộng</span>
                  <span className="font-medium">{formatVND(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí ship</span>
                  <span className="font-medium">Tùy khu vực</span>
                </div>

                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Thuế</span>
                  <span className="font-medium">{10}%</span>
                </div> */}

                {/* {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )} */}

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold">Tổng</span>
                  <span className="font-bold text-lg">{formatVND(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full mt-6 bg-light-brown hover:bg-light-brown/80"
                size="lg"
              >
                <Link
                  href="/checkout"
                  // className="text-sm bg-black text-white text-gray-600 hover:text-gray-900"
                >
                  Tiếp tục thanh toán
                </Link>
              </Button>

              {/* Continue Shopping */}
              <div className="mt-4 text-center">
                <Button className="w-full" size={"lg"}>
                  <Link
                    href="/"
                    // className="text-sm bg-black text-white text-gray-600 hover:text-gray-900"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
