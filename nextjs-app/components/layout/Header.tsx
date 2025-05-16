import Link from "next/link";
import { Input } from "../ui/input";
import { Phone, Search, ShoppingCart } from "lucide-react";
import MegaMenu from "../ui/categories-mega-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import MobileHeader from "./MobileHeader";
import { sanityFetch } from "@/sanity/lib/live";
import { getHeaderQuery, rootCategories } from "@/sanity/lib/queries";
import { AsyncComponent } from "@/types/async-component";
import { GetHeaderQueryResult, SettingsQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { RootCategoriesResult } from "@/sanity.types";
import FloatingHeader from "./FloatingHeader";
import { TypeAnimation } from "react-type-animation";
import AutoTyping from "../ui/autotyping";
import CartNavItem from "../ui/cartNavItem";

type HeaderProps = {
  siteSetting: SettingsQueryResult;
};

const Header: AsyncComponent<HeaderProps> = async function ({ siteSetting }) {
  const { data }: { data: GetHeaderQueryResult } = await sanityFetch({
    query: getHeaderQuery,
  });

  return (
    <header className="lg:py-10 py-5 flex flex-col gap-5 container">
      <div className="rounded-20 bg-light-brown p-5 flex justify-between items-center relative">
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
        <div className="text-center">
          <Link href={"/"}>
            {" "}
            {/* <h1 className="lg:text-heading-1-lg font-bold text-center text-white uppercase">
            {data?.title}
          </h1> */}
            <AutoTyping
              className="lg:text-heading-1-lg font-bold text-left text-white uppercase after:!animate-blink text-lg"
              wrapper="h1"
              sequence={[data?.title || "", 2000, ""]}
            />
          </Link>
        </div>
        <MobileHeader />
        <FloatingHeader data={data} siteSetting={siteSetting} />
        <div className="hidden lg:block"></div>
        <div className="items-center absolute right-5 hidden lg:flex">
          <Button
            variant={"link"}
            className="flex items-center gap-2 text-white"
          >
            <Image
              height={32}
              width={32}
              src={"/icons/vietnam.png"}
              alt="Vietnam"
            />
            Tiếng Việt
          </Button>
          <Button
            variant={"link"}
            className="flex items-center gap-2 text-white"
          >
            <Image height={32} width={32} src={"/icons/us.png"} alt="US" />
            English
          </Button>
        </div>
      </div>
      <div className="flex-col gap-5 hidden lg:flex">
        <div className="flex justify-between items-center">
          <Link
            href={"tel:0932120787"}
            className="text-2xl font-bold flex gap-2 items-center text-light-brown relative group"
          >
            <div className="absolute left-0 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-light-brown"></div>
            <Phone size={32} />
            {siteSetting?.contact?.phone}
          </Link>
          <div className="flex gap-10 items-center">
            <ul className="flex gap-5 items-center">
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
            <div>
              <Input icon={<Search />} placeholder="Tìm kiếm sản phẩm" />
            </div>
          </div>
        </div>
        <div className="flex justify-center rounded-20 bg-grey px-5">
          <ul className="flex gap-5 items-center text-white">
            {data?.categories?.map((item) => (
              <li key={item._id}>
                <MegaMenu data={item} />
              </li>
            ))}
          </ul>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
