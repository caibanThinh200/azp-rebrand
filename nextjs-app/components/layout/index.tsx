import { ChevronRight } from "lucide-react";
import { BreadcrumbNavigation } from "../ui/breadcrump-navigation";
import { sanityFetch } from "@/sanity/lib/live";
import FloatContact from "../ui/floating-contact";
import Footer from "./Footer";
import Header from "./Header";
import { getHeaderQuery, settingsQuery } from "@/sanity/lib/queries";
import React, { ReactElement } from "react";
import { AsyncComponent } from "@/types/async-component";
import { SettingsQueryResult } from "@/sanity.types";
import { CartProvider } from "@/context/cart";
import { CookiesProvider } from "react-cookie";
import ClientWrapper from "./ClientWrapper";

export type BreadcrumbPath = {
  title: string;
  slug: string;
};

interface LayoutProps {
  children: React.ReactNode;
  siteSettings: SettingsQueryResult;
  breadcrumpSitemap: BreadcrumbPath[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  siteSettings,
  breadcrumpSitemap,
}) => {
  return (
    <ClientWrapper>
      <FloatContact />
      <Header siteSetting={siteSettings} />
      <BreadcrumbNavigation
        breadcrumpSitemap={breadcrumpSitemap}
        separator={<ChevronRight className="h-4 w-4" />}
      />
      <div className="mb-20">{children}</div>

      <Footer siteSetting={siteSettings} />
    </ClientWrapper>
  );
};

export default Layout;
