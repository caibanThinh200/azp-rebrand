"use client";

import { CartProvider } from "@/context/cart";
import { FC, PropsWithChildren } from "react";
import { CookiesProvider } from "react-cookie";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const ClientWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <CookiesProvider>
        <CartProvider>{children}</CartProvider>
      </CookiesProvider>
    </NuqsAdapter>
  );
};

export default ClientWrapper;
