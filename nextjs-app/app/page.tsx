import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/lib/queries";
import PageBuilder from "./components/PageBuilder";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { data: homepageData } = await sanityFetch({
    query: getPageQuery,
    params: { slug: "home" },
  });
  return (
    <div className="container">
      <PageBuilder page={homepageData} />
    </div>
  );
}
