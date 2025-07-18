import Image from "next/image";
import { Minus, Plus, Facebook, Twitter } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProductTabs from "@/components/blocks/ProductDetail/InformationTabs";
import ProductMetaInformation from "@/components/blocks/ProductDetail/MetaInformation";
import ProductThumbnail from "@/components/blocks/ProductDetail/Thumbnails";
import ProductSwiper from "@/components/blocks/ProductSwiper";
import { sanityFetch } from "@/sanity/lib/live";
import { getProductDetailQuery, settingsQuery } from "@/sanity/lib/queries";
import { ImageProps } from "next-sanity/image";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { getProductsQuery } from "@/sanity/lib/queries";
import RecentProducts from "./components/RecentProducts";
import { defineQuery } from "next-sanity";
import { GetProductDetailQueryResult } from "@/sanity.types";
import { Reference } from "sanity";
import ProductDetailMobile from "@/components/blocks/ProductDetail/Mobile";
import { Metadata } from "next";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Fetch data based on the slug
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: getProductDetailQuery,
    params: { slug },
  });
  const { data: siteSetting } = await sanityFetch({ query: settingsQuery });
  return {
    openGraph: {
      images:
        urlForImage((data?.images as SanityAsset[])[0])?.url() ||
        resolveOpenGraphImage(siteSetting?.seo?.ogImage),
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: getProductDetailQuery,
    params: { slug },
  });

  const { data: products } = await sanityFetch({
    query: getProductsQuery,
    params: {
      category: (data?.category as Reference[])?.map((c) => c?._ref) || "",
    },
  });

  const { data: setting } = await sanityFetch({
    query: defineQuery(`*[_type == "settings"][0] {productNote}`),
  });

  const { productNote } = setting;

  return (
    <div className="container space-y-0">
      <div className="hidden lg:grid grid-cols-3 gap-4">
        <div className="sticky top-24 h-fit">
          <ProductThumbnail images={(data?.images as SanityAsset[]) || []} />
        </div>

        {/* Product Info */}
        <div className="col-span-2">
          <ProductMetaInformation data={data} note={productNote} />
        </div>
      </div>
      <ProductDetailMobile data={data} note={productNote} />
      {/* {(data?.content || data?.properties) && (
        <div>
          <ProductTabs content={data?.content} properties={data?.properties} />
        </div>
      )} */}
      <div className="mt-10">
        <ProductSwiper
          block={{
            title: "Sản phẩm tương tự",
            _type: "productSwiper",
            products,
          }}
        />
      </div>
      <RecentProducts product={data} />
      {/* <div>
        <ProductSwiper title="Sản phẩm đã xem" />
      </div> */}
    </div>
  );
}
