// must be using in client side, because of local storage dependency
"use client";

import React from "react";

import { fetchMyBookings } from "@/services/EventService";
import MyBooking from "./components/MyBooking";
import { Booking } from "@/common/types";
import { Button, Empty, Result, Spin } from "antd";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/navigation";
import { useMyBookingContext } from "./contexts/MyBookingContext";


const MyBookingsPage = () => {
  const { myBookings, loading } = useMyBookingContext();
  const router = useRouter();

  return (
    <div className="py-6">
      <h1 className="text-3xl font-semibold mb-4">My Bookings</h1>
      <Spin spinning={loading} tip="Loading data...">
        {isEmpty(myBookings) && !loading ? (
          <Result
            icon={<Empty description={null} />}
            title="You haven't placed any events yet!"
            extra={[
              <Button key="explore-btn" type="primary" onClick={() => router.push("/events")}>
                Explore events now
              </Button>,
            ]}
          />
        ) : (
          <div className="flex flex-col gap-6 min-h-40">
            {myBookings.map((booking) => (
              <MyBooking key={booking.bookingId} booking={booking} />
            ))}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default MyBookingsPage;
