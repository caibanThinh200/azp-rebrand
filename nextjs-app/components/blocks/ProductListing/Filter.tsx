import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/range-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import useDebounce from "@/hooks/useDebounce";
import { formatVND } from "@/lib/utils";
import { GetPropertiesResult } from "@/sanity.types";
import { FilterIcon, Search } from "lucide-react";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";

interface FilterProps {
  properties: GetPropertiesResult;
  filters: { [x: string]: string };
  handleUpdateFilter: (filter: { [x: string]: string }) => void;
}

const MemoSelect = memo(Select);

const priceRange = [0, 20000000]

const Filter = ({ properties, filters, handleUpdateFilter }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(priceRange)
  const debouncedQuery = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedQuery) {
      handleUpdateFilter({ search: debouncedQuery });
    }
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="flex gap-2 items-center text-xl text-[#133955]">
        <FilterIcon />
        Bộ lọc sản phẩm
      </h2>
      <div className="p-10 bg-white rounded-20 shadow">
        <div className="flex flex-col gap-5 mb-10">
          <h3 className="text-lg">Bộ lọc chung</h3>
          <div className="flex gap-5 items-center flex-col lg:flex-row">
            <div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search size={16} />}
                placeholder="Tìm kiếm sản phẩm"
              />
            </div>
            <div className="flex flex-col gap-5 ">
              {/* <p>Giá tiền</p> */}
             <div className="lg:w-[400px]"> 
                <RangeSlider 
                  value={range}
                  onValueCommit={(value) => {
                    handleUpdateFilter({
                      min: value[0].toString(),
                      max: value[1].toString()
                    })
                  }}
                  onValueChange={setRange}
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step={100000}
                />
              </div>
              <div className="flex gap-4 items-center text-light-brown">
                Từ {formatVND(range[0])} - đến {formatVND(range[1])}
              </div>
            </div>
          </div>
        </div>
        {properties?.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg">Tìm kiếm nâng cao</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {properties?.map((property) => (
                <div key={property?._id} className="lg:basis-1/5">
                  <MemoSelect
                    onValueChange={(value) => {
                      return handleUpdateFilter({ [property?._id]: value });
                    }}
                    value={filters[property?._id]}
                  >
                    <SelectTrigger
                      value={filters[property?._id]}
                      onClose={() => {
                        handleUpdateFilter({ [property?._id]: "" });
                      }}
                      className="w-full"
                    >
                      {/* <SelectValue placeholder={property?.title}>
                        {filters[property?._id]}
                      </SelectValue> */}
                      {filters[property?._id] ? (
                        filters[property?._id]
                      ) : (
                        <span className="text-muted-foreground">
                          {property?.title}
                        </span>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {property?.values?.map((value) => (
                        <SelectItem value={value} key={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </MemoSelect>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
