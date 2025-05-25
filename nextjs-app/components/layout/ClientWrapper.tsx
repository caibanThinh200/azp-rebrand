'use client';

import { CartProvider } from "@/context/cart";
import { FC, PropsWithChildren } from "react";
import { CookiesProvider } from "react-cookie";

const ClientWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CookiesProvider>
      <CartProvider>{children}</CartProvider>
    </CookiesProvider>
  );
};

export default ClientWrapper;
