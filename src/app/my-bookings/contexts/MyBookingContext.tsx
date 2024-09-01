"use client";

import { Booking } from "@/common/types";
import { notImplemented, sleep } from "@/common/utils";
import { fetchMyBookings, cancelMyBooking } from "@/services/EventService";
import { Modal, notification, Popconfirm } from "antd";
import React from "react";

interface MyBookingContextProps {
  loading: boolean;
  myBookings: Booking[];
  cancelBooking: (bookingId: string) => () => void;
}

const initialValues: MyBookingContextProps = {
  loading: true,
  myBookings: [],
  cancelBooking: notImplemented,
};

const MyBookingContext = React.createContext<MyBookingContextProps>(initialValues);
const useMyBookingContext = () => React.useContext(MyBookingContext);

const MyBookingProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [loading, setLoading] = React.useState(true);
  const [myBookings, setMyBookings] = React.useState<Booking[]>([]);

  const getMyBookings = React.useCallback(() => {
    setLoading(true);
    fetchMyBookings()
      .then((res) => sleep(1000).then(() => res))
      .then(setMyBookings)

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cancelBooking = React.useCallback(
    (bookingId: string) => () => {
      cancelMyBooking(bookingId)
        .then(getMyBookings)
        .then(() => notification.success({ message: "Booking cancelled" }));
    },
    [getMyBookings]
  );

  React.useEffect(() => {
    getMyBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyBookingContext.Provider value={{ loading, myBookings, cancelBooking }}>{children}</MyBookingContext.Provider>
  );
};

export { MyBookingProvider, useMyBookingContext };
