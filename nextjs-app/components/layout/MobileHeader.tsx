"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category, GetHeaderQueryResult } from "@/sanity.types";
import Link from "next/link";
import CartNavItem from "../ui/cartNavItem";

type HeaderType = Exclude<GetHeaderQueryResult, null>;

interface MobileHeaderProps {
  floating?: boolean;
  categories: Exclude<HeaderType["categories"], null>;
  navItems: Exclude<HeaderType["navItems"], null>;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  floating,
  categories,
  navItems,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="block lg:hidden">
      <Button onClick={toggleDrawer} className="p-0" variant={"link"}>
        <Image
          src={
            floating ? "/icons/burger-bar-yellow.svg" : "/icons/burger-bar.svg"
          }
          alt="hamburger"
          width={32}
          height={32}
        />
      </Button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={"100%"}
        className="p-10 overflow-scroll"
      >
        <Button className="p-0" variant={"link"} onClick={toggleDrawer}>
          <Image src={"/icons/close.png"} alt="Close" width={20} height={20} />
        </Button>
        <div className="mt-5">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4"
          >
            <h3 className="py-3">Danh mục</h3>
            {categories?.map((category) =>
              category?.children?.length > 0 ? (
                <AccordionItem value={category?._id} key={category?._id}>
                  <AccordionTrigger className="text-base pt-0">
                    {category?.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {category?.children?.map((category) => (
                      <Link
                        onClick={(e) => {
                          //   e.preventDefault();
                          toggleDrawer();
                        }}
                        key={category?._id}
                        href={`/danh-muc/${category?.slug}`}
                      >
                        {category?.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  onClick={(e) => {
                    // e.preventDefault();
                    toggleDrawer();
                  }}
                  className="pb-3 border-b border-border"
                  key={category?._id}
                  href={`/danh-muc/${category?.slug?.current}`}
                >
                  {category?.title}
                </Link>
              )
            )}
            <h3 className="py-3">Thông tin khác</h3>
            {(navItems || []).map((item, idx) => (
              <Link
                onClick={(e) => {
                  // e.preventDefault();
                  toggleDrawer();
                }}
                key={item?._id}
                className="pb-3 border-b border-border"
                href={
                  item.slug?.current?.includes("/")
                    ? item?.slug?.current
                    : `/${item.slug?.current}`
                }
              >
                <div className="absolute left-0 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-light-brown"></div>
                {item.name}
              </Link>
            ))}
          </Accordion>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileHeader;
