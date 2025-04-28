import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const Filter = () => {
  return (
    <div className="flex lg:gap-10 gap-5 items-center flex-col lg:flex-row ">
      <div className="flex-1 w-full">
        <Input icon={<Search size={16} />} placeholder="Tìm kiếm sản phẩm" />
      </div>
      <div className="flex-1 w-full">
        <Select>
          <SelectTrigger className="w-full ">
            <SelectValue className="!" placeholder="Loại sản phẩm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Bàn</SelectItem>
            <SelectItem value="dark">Ghế</SelectItem>
            <SelectItem value="system">Sofa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 w-full">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Giá tiền"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Từ 500.000 - 1.000.000</SelectItem>
            <SelectItem value="dark">Từ 1.000.000 - 5.000.000</SelectItem>
            <SelectItem value="system">Từ 5.000.000 - 20.000.000</SelectItem>
            <SelectItem value="system">Trên 20.000.000</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 w-full">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Màu sắc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <span className="size-10 rounded bg-red-600"></span>
              Đỏ
            </SelectItem>
            <SelectItem value="dark">
              <span className="size-10 rounded bg-blue-600"></span>Xanh
            </SelectItem>
            <SelectItem value="system">
              <span className="size-10 rounded bg-yellow"></span>
              Vàng
            </SelectItem>
            <SelectItem value="system">
              <span className="size-10 rounded bg-brown"></span>
              Nâu
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
