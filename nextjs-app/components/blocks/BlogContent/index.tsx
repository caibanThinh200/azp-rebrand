import { BlogContent } from "@/sanity.types";
import { CircleChevronUp } from "lucide-react";
import Link from "next/link";
import PortableText from "react-portable-text";

interface BlogContentProps {
  block: BlogContent;
}

const BlogContent: React.FC<BlogContentProps> = ({ block }) => {
  return (
    <div className="flex gap-10 overflow-y-visible">
      <div>
        <div className="sticky h-fit self-start top-32">
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
      <div className="flex-1">
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
                className="leading-10"
                content={section?.content as object[]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
