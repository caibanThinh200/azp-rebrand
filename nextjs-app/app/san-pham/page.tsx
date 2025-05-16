export const dynamic = "force-dynamic";

const ProductPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;

  return (
    <main className="lg:container px-5 flex flex-col gap-5 lg:gap-20">
      {query?.search}
    </main>
  );
};

export default ProductPage;
