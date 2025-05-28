"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetHeaderQueryResult } from "@/sanity.types";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type HeaderType = Exclude<GetHeaderQueryResult, null>;

interface MegaMenuProps {
  data: Exclude<HeaderType["categories"], null>[number];
}

interface CategoryNode {
  _id: string;
  title: string;
  slug: string;
  level: number;
  children: CategoryNode[];
}

export default function MegaMenu({ data }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  let openTimeout: NodeJS.Timeout;

  const renderCategoryTree = (nodes: CategoryNode[], currentLevel = 1) => {
    return (
      <DropdownMenuSub key={data?._id}>
        {nodes?.map((menu) => (
          <div key={menu?._id}>
            <DropdownMenuSubTrigger
              key={menu?._id}
              className="flex gap-2 items-center"
            >
              <Link
                className="flex gap-2 items-center relative group"
                href={`/danh-muc/${menu?.slug}`}
              >
                {menu?.title} {menu?.children?.length > 0 && <ChevronRight />}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-white"></div>
              </Link>
            </DropdownMenuSubTrigger>
            {menu?.children?.length > 0 && (
              <DropdownMenuSubContent
                sideOffset={10}
                alignOffset={-8}
                key={menu?._id}
              >
                {menu?.children?.map((subMenu) =>
                  subMenu.children.length > 0 ? (
                    renderCategoryTree(subMenu.children, currentLevel + 1)
                  ) : (
                    <DropdownMenuLabel key={subMenu?._id}>
                      {" "}
                      <Link href={`/danh-muc/${subMenu?.slug}`}>
                        {subMenu?.title}
                      </Link>
                    </DropdownMenuLabel>
                  )
                )}
                {}
              </DropdownMenuSubContent>
            )}

            {/* <ChevronLeft /> */}
          </div>
        ))}
      </DropdownMenuSub>
    );
  };

  return (
    <div>
      <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          onMouseEnter={() => {
            clearTimeout(openTimeout);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            console.log("leave");
            openTimeout = setTimeout(() => setIsOpen(false), 500); // 200ms delay
          }}
          className="py-2 outline-none"
        >
          <Link
            href={`/danh-muc/${data?.slug?.current}`}
            className="flex gap-2 items-center relative group"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 group-hover:w-full transition-all duration-300 h-0.5 rounded-full bg-white"></div>
            {data?.title} {data?.children?.length > 0 && <ChevronDown />}
          </Link>
        </DropdownMenuTrigger>
        {data?.children?.length > 0 && (
          <DropdownMenuContent
            onMouseEnter={() => {
              clearTimeout(openTimeout);
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              openTimeout = setTimeout(() => setIsOpen(false), 500); // 200ms delay
            }}
            sideOffset={0}
            align="start"
            className="p-2"
          >
            <div className="flex flex-col gap-2">
              {renderCategoryTree(data?.children as CategoryNode[])}
            </div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
