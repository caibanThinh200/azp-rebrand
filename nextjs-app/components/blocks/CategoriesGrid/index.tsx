"use client";

import FallbackImage from "@/components/ui/fallback-image";
import { isClientComponent } from "@/lib/utils";
import {
  Category,
  GetPageQueryResult,
  GridCard,
  Product,
  RootCategoriesResult,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { rootCategories } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface CategoriesGridProps {
  block: Omit<GridCard, "categories"> & { categories: Category[] };
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ block }) => {
  // const data = use(client.fetch(rootCategories));

  return (
    <div className="rounded-20 overflow-hidden">
      <div className="flex gap-2 flex-wrap justify-center">
        {(block?.categories || [])?.map((category, idx) => (
          <Link
            key={idx}
            href={`/danh-muc/${category?.slug?.current}`}
            className="relative h-[200px] flex justify-center items-center group overflow-hidden flex-1 basis-full md:basis-1/3 lg:basis-1/5 2xl:basis-1/6"
          >
            <FallbackImage
              src={(urlForImage(category?.image)?.url() as string) || ""}
              alt={category?.title}
              width={category?.image?.hotspot?.width || 200}
              height={category?.image?.hotspot?.height || 200}
              className="size-full absolute inset-0 brightness-50 object-cover group-hover:scale-125 transition-all duration-500"
            />
            <p className="text-white text-xl font-bold relative z-10 text-center">
              {category?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
