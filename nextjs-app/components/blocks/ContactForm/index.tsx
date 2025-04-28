"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { ContactForm as IContactForm, SettingsQueryResult } from "@/sanity.types";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  message: string;
};

interface ContactFormProps {
  block: IContactForm;
  siteSettings: SettingsQueryResult;
}

export default function ContactForm({ block, siteSettings }: ContactFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  console.log(siteSettings);

  const onSubmit = (data: FormData) => {
    console.log({ ...data, file });
    // Handle form submission here
  };

  return (
    <div className="rounded-20 overflow-hidden border border-black shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col gap-10">
          <h2 className="text-light-brown font-semibold">{block?.title}</h2>
          <div>
            <p>{block?.description}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                  Họ và tên<span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  className="w-full rounded-full"
                  placeholder="Họ và tên"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Yêu cầu nhập họ tên</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email:<span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  className="w-full rounded-full"
                  placeholder="Địa chỉ email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    Valid email is required
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="companyName" className="block font-medium">
                  Tên công ty (nếu có)<span className="text-red-500">*</span>
                </label>
                <Input
                  id="companyName"
                  type="text"
                  className="w-full rounded-full"
                  placeholder="Tên công ty"
                  {...register("companyName", { required: true })}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    Company name is required
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block font-medium">
                  Số điện thoại<span className="text-red-500">*</span>
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  className="w-full rounded-full"
                  placeholder="Số điện thoại"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    Phone number is required
                  </p>
                )}
              </div>
            </div>

            {/* <div className="space-y-2">
              <label htmlFor="file" className="block font-medium">
                Upload file
              </label>
              <div>
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-light-brown hover:bg-amber-600 text-white font-medium rounded-full cursor-pointer transition-colors"
                >
                  Upload file
                </label>
                <Input
                  id="file-upload"
                  type="file"
                  //   className="!hidden"
                  wrapperClassName="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file && (
                  <span className="ml-3 text-sm text-gray-600">
                    {file.name}
                  </span>
                )}
              </div>
            </div> */}

            <div className="space-y-2">
              <label htmlFor="message" className="block font-medium">
                Tin nhắn
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-3 rounded-20 bg-white shadow-xl border border-grey/50"
                placeholder="Tin nhắn"
                rows={5}
                {...register("message")}
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-light-brown hover:bg-amber-600 text-white font-medium rounded-full transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 md:p-10">
          <div className="h-full flex flex-col">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-light-brown rounded-md flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">AZP</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow">
                  Thông tin liên lạc
                </h3>
              </div>

              <div className="space-y-6">
                {siteSettings?.contact?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-4 text-white" />
                    <span>{siteSettings?.contact?.phone}</span>
                  </div>
                )}

                {siteSettings?.contact?.phone && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-4 text-white shrink-0" />
                    <span>{siteSettings?.contact?.email}</span>
                  </div>
                )}

                {(siteSettings?.contact?.address || [])?.length > 0 &&
                  siteSettings?.contact?.address?.map((addr) => (
                    <div key={addr} className="flex items-start">
                      <MapPin className="w-5 h-5 mr-4 text-white shrink-0" />
                      <span>{addr}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
