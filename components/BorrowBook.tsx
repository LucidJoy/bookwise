"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast("Error", { description: message });
    }

    setBorrowing(true);

    try {
      const res = await borrowBook({ bookId, userId });

      if (res.success) {
        toast("Success", {
          description: "Book borrow success.",
        });

        router.push("/my-profile");
      } else {
        toast("Error", { description: "An error occured" });
      }
    } catch (error) {
      toast("Error", { description: error as string });
    }
  };

  return (
    <Button
      className='book-overview_btn'
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src='/icons/book.svg' alt='book' width={20} height={20} />
      <p className='font-bebas-neue text-xl text-dark-100'>
        {borrowing ? "Borrowing..." : "Borrow"}
      </p>
    </Button>
  );
};

export default BorrowBook;
