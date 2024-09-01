"use client";

import { Button } from "antd";
import React from "react";
import { ELM_ID } from "../constants";

const BookNowButton = () => {
  const onClickBookNow = () => {
    const bookNowElm = document.getElementById(ELM_ID.BOOK_NOW_FORM);
    if (bookNowElm) {
      bookNowElm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button block type="primary" size="large" className="mt-4" onClick={onClickBookNow}>
      Book now
    </Button>
  );
};

export default BookNowButton;
