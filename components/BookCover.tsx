"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverUrl: string;
}

const BookCover = ({
  variant = "regular",
  className,
  coverColor = "#012b48",
  coverUrl,
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className='absolute z-10'
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverUrl}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt='book cover'
          fill
          className='rounded-sm object-fill'
          loading='lazy'
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;
