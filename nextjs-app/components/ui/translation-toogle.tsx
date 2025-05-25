"use client";

import Image from "next/image";
import { Button } from "./button";
import { useCookies } from "react-cookie";
import { useCallback } from "react";

interface TranslationToogleProps {}

interface CookieValues {
  lang?: string;
  googtrans?: string;
}

const TranslationToogle: React.FC<TranslationToogleProps> = () => {
  const [cookies, setCookie] = useCookies(["lang", "googtrans"]);

  const handleChangeLanguage = useCallback((language: string, lang: string) => {
    setCookie("lang", lang);
    setCookie("googtrans", language);

    window.location.reload();
  }, []);

  return (
    <div className="items-center absolute right-5 hidden lg:flex">
      <Button
        onClick={(e) => handleChangeLanguage("/en/vi", "VI")}
        variant={"link"}
        className="flex items-center gap-2 text-white"
      >
        <Image
          height={32}
          width={32}
          src={"/icons/vietnam.png"}
          alt="Vietnam"
        />
        Tiếng Việt
      </Button>
      <Button
        onClick={(e) => handleChangeLanguage("/vi/en", "EN")}
        variant={"link"}
        className="flex items-center gap-2 text-white"
      >
        <Image height={32} width={32} src={"/icons/us.png"} alt="US" />
        English
      </Button>
    </div>
  );
};

export default TranslationToogle;
