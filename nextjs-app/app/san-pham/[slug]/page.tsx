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
  params: { slug: string };
}) {
  const slug = await params?.slug;
  const { data } = await sanityFetch({
    query: getProductDetailQuery,
    params: { slug },
  });

  return (
    <div className="container space-y-10">
      <div className="grid grid-cols-3 gap-8">
        <ProductThumbnail images={(data?.images as SanityAsset[]) || []} />

        {/* Product Info */}
        <ProductMetaInformation data={data} />
      </div>
      {(data?.content || data?.property) && (
        <div>
          <ProductTabs />
        </div>
      )}
      {/* <div>
        <ProductSwiper block={{ title: "Sản phẩm tương tự", _type: "productSwiper" }} />
      </div>
      <div>
        <ProductSwiper title="Sản phẩm đã xem" />
      </div> */}
    </div>
  );
}
