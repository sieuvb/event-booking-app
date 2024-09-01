"use client";

import { STORAGE_KEY } from "@/common/constants";
import { Checkbox, Modal, TourProps } from "antd";
import React from "react";
import { ELM_ID } from "../constants";
import useElementInViewPort from "@/hooks/useElementInViewPort";

const useBookNowTour = () => {
  const [tourOpen, setOpenTour] = React.useState(false);

  useElementInViewPort(
    (isIntersecting: boolean) => {
      const floatingBookNowBtn = document.getElementById(ELM_ID.FLOATING_BOOK_NOW_BTN);
      if (isIntersecting) {
        if (floatingBookNowBtn) {
          floatingBookNowBtn.style.opacity = "0";
        }
        setTimeout(() => {
          const dontShowTour = localStorage.getItem(STORAGE_KEY.DONT_SHOW_BOOK_NOW_TOUR) === "true";
          if (dontShowTour) return;
          setOpenTour(true);
        }, 500);
      } else {
        if (floatingBookNowBtn) {
          floatingBookNowBtn.style.opacity = "1";
        }
      }
    },
    () => document.getElementById(ELM_ID.BOOK_NOW_FORM) as NonNullable<HTMLElement>
  );

  const tourSteps: TourProps["steps"] = React.useMemo(
    () => [
      {
        target: () => document.getElementById(ELM_ID.TICKET_TYPE) as NonNullable<HTMLElement>,
        title: "Select the ticket type.",
        description: "Each ticket type has different prices.",
      },
      {
        target: () => document.getElementById(ELM_ID.ATTENDEE) as NonNullable<HTMLElement>,
        title: "Fill in your information.",
        description: "Please make sure to fill in your full name and email correctly.",
      },
      {
        target: () => document.getElementById(ELM_ID.BOOK_NOW_BTN) as NonNullable<HTMLElement>,
        title: "Click to book now.",
        description: "Hurry up! The tickets are running out.",
      },
    ],
    []
  );

  const closeTour = React.useCallback(() => {
    let isShowTourAgain = false;
    Modal.info({
      title: "Are you sure you want to close the tour?",
      content: (
        <Checkbox defaultChecked={!isShowTourAgain} onChange={(e) => (isShowTourAgain = !e.target.checked)}>
          Don&apos;t show this tour again
        </Checkbox>
      ),
      onOk: () => {
        if (!isShowTourAgain) {
          localStorage.setItem(STORAGE_KEY.DONT_SHOW_BOOK_NOW_TOUR, "true");
        }
        setOpenTour(false);
      },
    });
  }, []);

  return {
    tourSteps,
    tourOpen,
    closeTour,
  };
};

export default useBookNowTour;
