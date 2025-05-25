"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Search = () => {
  const { handleSubmit, register } = useForm<{ search: string }>({});
  const router = useRouter();

  const handleSearch = ({ search }: { search: string }) => {
    router.push(`/san-pham?search=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex gap-5 items-center"
    >
      <Input
        {...register("search", { required: true })}
        icon={<SearchIcon />}
        placeholder="Tìm kiếm sản phẩm"
      />
      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
};

export default Search;
