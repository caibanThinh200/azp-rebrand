"use client";

import { cn } from "@/lib/utils";
import { GetHeaderQueryResult, SettingsQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import CartNavItem from "../ui/cartNavItem";
import MobileHeader from "./MobileHeader";

interface FloatingHeaderProps {
  siteSetting: SettingsQueryResult;
  data: GetHeaderQueryResult;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  siteSetting,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const handleScroll = useCallback(() => {
    const { scrollY } = window;
    setOpen(scrollY >= 320);
  }, []);

  useEventListener("scroll", handleScroll);

  return (
    <div
      className={cn(
        "fixed w-full rounded-xl left-0 top-0 bg-white py-1 transition-all duration-700 z-[100] shadow-xl",
        open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[200px]"
      )}
    >
      <div className="container flex justify-between items-center">
        <Link href={"/"}>
          <div className="bg-white size-[40px] lg:size-[70px] rounded-full">
            <Image
              src={urlForImage(data?.logo)?.url() || ""}
              className="size-full object-contain"
              width={70}
              height={70}
              alt="logo"
            />
          </div>
        </Link>
        <MobileHeader floating />
        <div className="flex gap-10 items-center hidden lg:block">
          <ul className="flex gap-10 items-center">
            {(data?.navItems || []).map((item, idx) => (
              <li key={item?._id}>
                {item?.slug?.current === "gio-hang" ? (
                  <CartNavItem item={item} />
                ) : (
                  <Link
                    className="hover:text-light-brown transition-all duration-500 relative group"
                    href={
                      item.slug?.current?.includes("/")
                        ? item?.slug?.current
                        : `/${item.slug?.current}`
                    }
                  >
                    <div className="absolute left-0 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-light-brown"></div>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* <Link
              href="/gio-hang"
              className="flex gap-2 items-center has-\[\>svg\]\:px-0 text-base px-0"
            >
              <ShoppingCart />
              Giỏ hàng
            </Link> */}
        </div>
        <div className="hidden lg:block">
          <Input icon={<Search />} placeholder="Tìm kiếm sản phẩm" />
        </div>
      </div>
    </div>
  );
};

export default FloatingHeader;
