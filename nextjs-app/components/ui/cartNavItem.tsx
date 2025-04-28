"use client";

import { useCart } from "@/context/cart";
import { GetHeaderQueryResult } from "@/sanity.types";
import Link from "next/link";

interface CartNavItemProps {
  item: Exclude<Exclude<GetHeaderQueryResult, null>["navItems"], null>[number];
}

const CartNavItem: React.FC<CartNavItemProps> = ({ item }) => {
  const { itemCount } = useCart();

  return (
    <Link
      className="hover:text-light-brown transition-all duration-500 relative group"
      href={
        item.slug?.current?.includes("/")
          ? item?.slug?.current
          : `/${item.slug?.current}`
      }
    >
      <div className="absolute -right-3 -top-3 bg-red-600 size-5 rounded-full text-center text-white text-xs flex justify-center items-center">
        {itemCount}
      </div>
      <div className="absolute left-0 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-light-brown"></div>
      {item.name}
    </Link>
  );
};

export default CartNavItem;
