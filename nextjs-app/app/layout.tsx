import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "react-modern-drawer/dist/index.css";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Epilogue, Be_Vietnam_Pro } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/app/components/DraftModeToast";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {
  getAllCategories,
  getAllPages,
  getAllProducts,
  getPageQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import Layout from "@/components/layout";
import { SettingsQueryResult } from "@/sanity.types";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.seo?.title || demo.title;
  const description = settings?.seo?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.seo?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.seo?.ogImage?.metadataBase
      ? new URL(settings?.seo.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-beVietnamPro",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  const siteSetting: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });

  const pages = await sanityFetch({ query: getAllPages });
  const products = await sanityFetch({ query: getAllProducts });
  const categories = await sanityFetch({ query: getAllCategories });

  const breadcrumpSitemap = [
    ...pages?.data?.map((page) => ({
      title: page.name,
      slug: page?.slug?.current,
    })),
    ...products?.data?.map((product) => ({
      title: product?.title,
      slug: product?.slug?.current,
    })),
    ...categories?.data?.map((category) => ({
      title: category?.title,
      slug: category?.slug?.current,
    })),
  ];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${beVietnamPro.className} bg-[#E6E6E5] text-black`}
    >
      <body className="bg-transparent">
        {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
            <VisualEditing />
          </>
        )}
        {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
        <SanityLive onError={handleError} />
        <Layout
          breadcrumpSitemap={breadcrumpSitemap}
          siteSettings={siteSetting.data}
        >
          {children}
        </Layout>
        <SpeedInsights />
      </body>
    </html>
  );
}

export const dynamic = "force-static";
