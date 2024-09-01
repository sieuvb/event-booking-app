"use client";

import React from "react";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { DATA_TIME_FORMAT, DISPLAY_DATE_FORMAT } from "@/common/constants";
import { Booking } from "@/common/types";
import { ClockCircleOutlined, GlobalOutlined } from "@ant-design/icons";
import { useMyBookingContext } from "../contexts/MyBookingContext";

interface MyBookingProps {
  booking: Booking;
}

const MyBooking: React.FC<MyBookingProps> = (props) => {
  const { booking } = props;
  const { event, fullName, bookingId, type } = booking;
  const {
    id,
    name,
    start_date: startDate,
    start_time: startTime,
    image: { url: imageUrl },
    primary_venue: {
      address: { country },
    },
    ticket_availability: {
      is_free: isFree,
      minimum_ticket_price: { display: minDisplayPrice },
    },
  } = event;

  const displayTime = dayjs(`${startDate} ${startTime}`, DATA_TIME_FORMAT).format(DISPLAY_DATE_FORMAT);
  const { cancelBooking } = useMyBookingContext();

  return (
    <div className="flex flex-col h-fit md:grid md:grid-cols-[minmax(0,120px)_minmax(0,300px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,240px)_minmax(0,500px)_minmax(0,1fr)] md:h-52 border-2 border-solid border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all">
      <Image width={240} height={208} className="block w-full h-full object-cover" src={imageUrl} alt={name} />
      <ul className="flex flex-col gap-2 px-4 pb-4 mt-3">
        <Link className="text-xl overflow-hidden overflow-ellipsis line-clamp-2" href={`/events/${id}`}>
          {name}
        </Link>
        <li className="flex items-center">
          <ClockCircleOutlined />
          &nbsp;
          {displayTime}
        </li>
        <li className="flex items-center">
          <GlobalOutlined />
          &nbsp;
          {country}
        </li>
        <li className="flex items-end">
          <span>
            {isFree ? (
              <span className="text-2xl font-medium">Free</span>
            ) : (
              <span className="text-2xl font-medium">{minDisplayPrice}</span>
            )}
          </span>
        </li>
      </ul>
      <div className="flex flex-col justify-center border-t-2 py-4 px-4 md:border-l-2 md:border-t-0 border-dashed border-gray-600 lg:py-2 lg:pl-6">
        <h3 className="text-2xl mb-2">Booking info</h3>
        <span>
          Booking number: <span className="font-medium">{bookingId}</span>
        </span>
        <span>
          Ticket type: <span className="font-medium">{type}</span>
        </span>
        <span>
          Attendee: <span className="font-medium">{fullName}</span>
        </span>
        <Popconfirm
          title="Cancel booking"
          description="Are you sure you want to cancel this booking?"
          onConfirm={cancelBooking(bookingId)}
          okText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button className="self-end" type="link" danger>
            Cancel
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default MyBooking;
