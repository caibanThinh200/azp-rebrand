import { Settings, SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { getFooterQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { AsyncComponent } from "@/types/async-component";
import Image from "next/image";
import Link from "next/link";
import PortableText from "react-portable-text";

interface FooterProps {
  siteSetting: SettingsQueryResult;
}

const Footer: AsyncComponent<FooterProps> = async ({ siteSetting }) => {
  const { data } = await sanityFetch({ query: getFooterQuery });
  return (
    <footer
      style={{
        backgroundColor: data?.backgroundColor?.hex || "#493b3b",
      }}
      className="text-white pt-10 pb-5"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Section */}
          <div>
            <h3 className="text-yellow font-bold mb-4">{data?.headline}</h3>
            <div className="text-sm flex flex-col gap-5">
              {/* {(siteSetting?.contact?.address || [])?.length > 0 &&
                siteSetting?.contact?.address?.map((addr, idx) => (
                  <p key={idx} className="text-sm">
                    {addr}
                  </p>
                ))}
              {siteSetting?.contact?.phone && (
                <Link
                  href={`tel:${siteSetting?.contact?.phone}`}
                  className="text-sm"
                >
                  Điện Thoại: {siteSetting?.contact?.phone}
                </Link>
              )}
              {siteSetting?.contact?.email && (
                <Link
                  href={`mailto:${siteSetting?.contact?.email}`}
                  className="text-sm"
                >
                  Email: {siteSetting?.contact?.email}
                </Link>
              )} */}
              <PortableText content={siteSetting?.contact as object[]} />
            </div>
          </div>

          {/* Customer Support Section */}
          <div>
            <h3 className="text-yellow font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="text-sm space-y-3">
              {data?.supportColumn?.map((column) => (
                <li key={column?._key}>
                  <Link
                    href={
                      `/chinh-sach#${column?.slug?.current as string}` || ""
                    }
                  >
                    {column?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-yellow font-bold mb-4">MẠNG XÃ HỘI</h3>
            {data?.socials?.map((social) => (
              <Link
                href={social?.url as string}
                key={social?._key}
                target="_blank"
                className="flex gap-2 items-center"
              >
                <Image
                  alt={social?.name || "Logo"}
                  width={social?.logo?.hotspot?.width || 30}
                  height={social?.logo?.hotspot?.height || 30}
                  src={urlForImage(social?.logo)?.url() as string}
                />
                {social?.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm">{data?.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
