import FallbackImage from "@/components/ui/fallback-image";
import { Category, GridCard } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";

interface CategoriesGridProps {
  block: Omit<GridCard, "categories"> & { categories: Category[] };
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ block }) => {
  // const data = use(client.fetch(rootCategories));

  return (
    <div>
      <div className="rounded-20 overflow-hidden">
        <div className="flex gap-2 flex-wrap justify-center hidden lg:flex">
          {(block?.categories || [])?.map((category, idx) => (
            <Link
              key={idx}
              href={`/danh-muc/${category?.slug?.current}`}
              className="relative h-[200px] rounded-20 flex justify-center items-center group overflow-hidden flex-1 basis-full md:basis-1/3 lg:basis-1/5 2xl:basis-1/6"
            >
              <FallbackImage
                src={(urlForImage(category?.coverImage)?.url() as string) || ""}
                alt={category?.title}
                width={category?.coverImage?.hotspot?.width || 200}
                height={category?.coverImage?.hotspot?.height || 200}
                className="size-full absolute inset-0 brightness-50 object-cover group-hover:scale-125 transition-all duration-500"
              />
              <p className="text-white text-xl font-bold relative z-10 text-center">
                {category?.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <div>
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            // breakpoints={{
            //   360: {
            //     slidesPerView: 2,
            //   },
            //   768: {
            //     slidesPerView: 2,
            //   },
            //   1024: {
            //     slidesPerView: 4,
            //   },
            // }}
          >
            {(block?.categories || [])?.map((category, idx) => (
              <SwiperSlide key={category?._id}>
                <Link
                  href={`/danh-muc/${category?.slug?.current}`}
                  className="relative h-[100px] overflow-hidden flex flex-col justify-center rounded-xl"
                >
                  <FallbackImage
                    src={(urlForImage(category?.image)?.url() as string) || ""}
                    alt={category?.title}
                    width={category?.image?.hotspot?.width || 200}
                    height={category?.image?.hotspot?.height || 200}
                    className="size-full object-contain absolute inset-0 brightness-50 object-cover group-hover:scale-125 transition-all duration-500"
                  />
                  <p className="text-white font-bold relative z-10 text-center">
                    {category?.title}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
