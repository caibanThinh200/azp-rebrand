"use client";

import { CartProvider } from "@/context/cart";
import { FC, PropsWithChildren } from "react";
import { CookiesProvider } from "react-cookie";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

const ClientWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <CookiesProvider>
        <CartProvider>{children}</CartProvider>
        <Toaster />
      </CookiesProvider>
    </NuqsAdapter>
  );
};

export default ClientWrapper;
