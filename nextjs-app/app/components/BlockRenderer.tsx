import React, { useState } from "react";

import { dataAttr } from "@/sanity/lib/utils";
import { SettingsQueryResult } from "@/sanity.types";

import dynamic from "next/dynamic";
import ShoppingCart from "@/components/blocks/ShoppingCart";

const Hero = dynamic(() => import("@/components/blocks/Hero"));
const CategoriesGrid = dynamic(
  () => import("@/components/blocks/CategoriesGrid")
);
const ProductSwiper = dynamic(
  () => import("@/components/blocks/ProductSwiper")
);
const ProductList = dynamic(() => import("@/components/blocks/ProductListing"));
const Process = dynamic(() => import("@/components/blocks/Process"));
const Quote = dynamic(() => import("@/components/blocks/Quote"));
const BlogContent = dynamic(() => import("@/components/blocks/BlogContent"));
const Map = dynamic(() => import("@/components/blocks/Map"));
const ContactForm = dynamic(() => import("@/components/blocks/ContactForm"));

type BlocksType = {
  [key: string]: React.ComponentType<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
  siteSettings?: SettingsQueryResult;
};

const Blocks: BlocksType = {
  heroSlider: Hero,
  gridCard: CategoriesGrid,
  productSwiper: ProductSwiper,
  productListing: ProductList,
  processStep: Process,
  contactForm: ContactForm,
  quote: Quote,
  blogContent: BlogContent,
  map: Map,
  shoppingCart: ShoppingCart
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
  siteSettings,
}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          siteSettings,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  );
}
