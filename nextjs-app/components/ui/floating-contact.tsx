'use client'

import clsx from "clsx";
import Image from "next/image";
import {
    LegacyRef,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface IFloatContactProps { }

const FloatContact: React.FC<IFloatContactProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (overlayRef.current as HTMLDivElement).style.height = !isOpen
            ? "0px"
            : `${overlayRef.current?.scrollHeight}px` || "0px";
    }, [isOpen]);

    const handleOpenContact = useCallback(
        (e: MouseEvent<any>) => {
            (overlayRef.current as HTMLDivElement).style.height = isOpen
                ? "0px"
                : `${overlayRef.current?.scrollHeight}px` || "0px";
            setIsOpen(!isOpen);
        },
        [isOpen]
    );

    return (
        <div className="fixed z-30 lg:bottom-[32px] lg:right-16 right-5 bottom-5 flex flex-col items-center gap-2 overflow-hidden">
            <div>
                <svg
                    onClick={handleOpenContact}
                    className={clsx(
                        "cursor-pointer transition-all",
                        isOpen ? "rotate-0" : "rotate-180"
                    )}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        width="24"
                        height="24"
                        rx="12"
                        fill="url(#paint0_linear_21_2666)"
                    />
                    <path
                        d="M16.6668 12.6666L12.0002 17.3333L7.3335 12.6666M16.6668 7.33325L12.0002 11.9999L7.3335 7.33325"
                        stroke="#FDFDFD"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_21_2666"
                            x1="-5.72477"
                            y1="-4.64"
                            x2="43.4708"
                            y2="15.3544"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#AA875C" />
                            <stop offset="1" stopColor="#AA875C" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="flex flex-col gap-2">
                <div
                    className="border-2 bg-white border-begonia p-[12px] rounded-xl flex gap-3 w-full items-center"
                    style={{
                        boxShadow: "0px 0px 10px 0px rgba(231, 91, 111, 0.15)",
                    }}
                >
                    <Image
                        src={"/icons/zalo.png"}
                        alt="Zalo"
                        height={32}
                        width={32}
                    />
                    <p className="font-bold hidden lg:block">0932120787</p>
                </div>
                <div
                    ref={overlayRef}
                    className="flex flex-col gap-2 transition-all duration-300"
                >
                    <div
                        className="border-2 bg-white border-begonia p-[12px] rounded-xl flex items-center w-full gap-3"
                        style={{
                            boxShadow: isOpen
                                ? "0px 0px 10px 0px rgba(231, 91, 111, 0.15)"
                                : "none",
                        }}
                    >
                        <Image
                            src={"/icons/messenger.png"}
                            alt="Messenger"
                            height={32}
                            width={32}
                        />
                        <p className="font-bold hidden lg:block">Messenger</p>
                    </div>
                    <div
                        onClick={() => window.open("tel:0818598088")}
                        className="border-2 bg-white border-begonia p-[12px] rounded-xl flex gap-3 w-full items-center cursor-pointer"
                        style={{
                            boxShadow: "0px 0px 10px 0px rgba(231, 91, 111, 0.15)",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <path
                                d="M4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667V8C4 19.0453 12.9547 28 24 28H25.3333C26.0406 28 26.7189 27.719 27.219 27.219C27.719 26.7189 28 26.0406 28 25.3333V20.9613C28.0001 20.6814 27.912 20.4085 27.7483 20.1814C27.5846 19.9543 27.3536 19.7845 27.088 19.696L21.0973 17.6987C20.7929 17.5975 20.4621 17.6094 20.1658 17.7324C19.8695 17.8553 19.6274 18.081 19.484 18.368L17.9773 21.3773C14.7126 19.9022 12.0978 17.2874 10.6227 14.0227L13.632 12.516C13.919 12.3726 14.1447 12.1305 14.2676 11.8342C14.3906 11.5379 14.4025 11.2071 14.3013 10.9027L12.304 4.912C12.2156 4.64661 12.046 4.41574 11.8191 4.25207C11.5923 4.0884 11.3197 4.00021 11.04 4H6.66667C5.95942 4 5.28115 4.28095 4.78105 4.78105Z"
                                stroke="#4B5563"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="font-bold hidden lg:block">0932120787</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatContact;
