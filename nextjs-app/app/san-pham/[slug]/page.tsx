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
import { getProductDetailQuery } from "@/sanity/lib/queries";
import { ImageProps } from "next-sanity/image";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

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

  return (
    <div className="container space-y-0">
      <div className="grid grid-cols-3 gap-4">
        <div className="sticky top-24 h-fit">
          <ProductThumbnail images={(data?.images as SanityAsset[]) || []} />
        </div>

        {/* Product Info */}
        <div className="col-span-2">
          <ProductMetaInformation data={data} />
        </div>
      </div>
      {/* {(data?.content || data?.properties) && (
        <div>
          <ProductTabs content={data?.content} properties={data?.properties} />
        </div>
      )} */}
      {/* <div>
        <ProductSwiper block={{ title: "Sản phẩm tương tự", _type: "productSwiper" }} />
      </div>
      <div>
        <ProductSwiper title="Sản phẩm đã xem" />
      </div> */}
    </div>
  );
}
