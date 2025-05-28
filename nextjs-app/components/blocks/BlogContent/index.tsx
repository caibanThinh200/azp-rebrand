import { BlogContent as IBlogContent } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { CircleChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PortableText from "react-portable-text";
import { Image as SImage } from "sanity";

interface BlogContentProps {
  block: IBlogContent;
}

const BlogContent: React.FC<BlogContentProps> = ({ block }) => {
  return (
    <div className="flex gap-10 overflow-y-visible">
      <div>
        <div className="sticky h-fit self-start top-32 rounded-20 p-3 py-5 bg-white shadow">
          <h3 className="mb-5 font-bold text-light-brown text-lg flex justify-between">
            Nội Dung Bài Viết
          </h3>
          <ul className="pl-2 space-y-2 text-sm">
            {block?.sections?.map((section, idx) => (
              <li key={`section-${section._key}`}>
                <Link
                  className="hover:text-light-brown transition-color duration-300"
                  href={`#${section?.slug?.current}`}
                >
                  {idx + 1}. {section?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        {block?.thumbnail && (
          <Image
            className="rounded-20 shadow"
            alt={block?.title as string}
            style={{ height: block?.thumbnail?.hotspot?.height || "auto" }}
            src={urlForImage(block?.thumbnail)?.url() as string}
            width={block?.thumbnail?.hotspot?.width || 1000}
            height={block?.thumbnail?.hotspot?.height || 500}
          />
        )}
        <div className="rounded-20 p-10 bg-white shadow">
          <h2 className="mb-10">{block?.title}</h2>
          <div className="flex flex-col gap-10">
            {block?.sections?.map((section, idx) => (
              <div
                className="flex flex-col gap-5 pb-5 border-b border-gray"
                key={section?._key}
              >
                <h3 className="text-light-brown" id={section?.slug?.current}>
                  {idx + 1}. {section?.title}
                </h3>
                <PortableText
                  serializers={{
                    image: (props: SImage) => (
                      <Image
                        alt={props?.asset?._key as string}
                        src={urlForImage(props)?.url() as string}
                        width={props?.hotspot?.width || 200}
                        height={props?.hotspot?.height || 200}
                      />
                    ),
                  }}
                  className="leading-normal"
                  content={section?.content as object[]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
