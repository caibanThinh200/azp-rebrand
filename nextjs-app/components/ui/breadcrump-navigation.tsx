"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import { BREADCRUMP } from "@/constant/breadcrumb";
import { BreadcrumbPath } from "../layout";

interface BreadcrumbNavigationProps {
  homeLabel?: string;
  separator?: React.ReactNode;
  breadcrumpSitemap: BreadcrumbPath[];
}

export function BreadcrumbNavigation({
  homeLabel = "Trang chủ",
  separator,
  breadcrumpSitemap,
}: BreadcrumbNavigationProps) {
  const pathname = usePathname();

  const dynamicBreadcrumps = useMemo(() => {
    const breadcrumpsObj: { [x: string]: string } = {};
    (breadcrumpSitemap || [])?.forEach(
      (br) => (breadcrumpsObj[br.slug] = br.title)
    );

    return breadcrumpsObj;
  }, [breadcrumpSitemap]);
  // Split pathname into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = { ...BREADCRUMP, ...dynamicBreadcrumps }[segment] || segment;
    const isLastItem = index === segments.length - 1;

    return {
      href,
      label,
      isLastItem,
    };
  });

  // Skip rendering breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb className="container pb-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <HomeIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">{homeLabel}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={`${item.href}-${index}`}>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            <BreadcrumbItem key={item.href}>
              {item.isLastItem ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
