"use client";

import React from "react";

import { submitBooking } from "@/services/EventService";
import useModal from "@/hooks/useModal";
import useBookNowTour from "./useBookNowTour";
import { TicketType } from "../constants";

interface FormValues {
  eventId: string;
  type: TicketType;
  fullName: string;
  email: string;
  bookingId?: string;
}

const useBookNowForm = () => {
  const { tourOpen, tourSteps, closeTour } = useBookNowTour();

  const [successVals, setSuccessVals] = React.useState<FormValues | null>(null);
  const { isOpen: isOpenSuccessModal, closeModal: closeSuccessModal, openModal: openSuccessModal } = useModal();

  const onSubmitBooking = React.useCallback(
    (values: FormValues) => {
      submitBooking(values).then((bookingInfo: FormValues) => {
        setSuccessVals(bookingInfo);
        openSuccessModal();
      });
    },
    [openSuccessModal]
  );

  return {
    tourOpen,
    tourSteps,
    closeTour,
    successVals,
    isOpenSuccessModal,
    closeSuccessModal,
    openSuccessModal,
    onSubmitBooking,
  };
};

export default useBookNowForm;
