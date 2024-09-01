"use client";

import React from "react";
import { Button, Form, Input, Modal, Result, Tour, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import RadioGroup from "antd/es/radio/group";
import RadioButton from "antd/es/radio/radioButton";
import { useRouter } from "next/navigation";

import { ELM_ID, TicketType } from "../constants";
import useBookNowForm from "../hooks/useBookNowForm";
import "./book-now.css";

interface BookNowFormProps {
  eventId: string;
}

const FORM_INITIAL_VALUES = {
  type: TicketType.GeneralAdmission,
};

const BookNowForm: React.FC<BookNowFormProps> = ({ eventId }) => {
  const router = useRouter();

  const {
    tourOpen,
    tourSteps,
    closeTour,
    successVals,
    isOpenSuccessModal,
    closeSuccessModal,
    onSubmitBooking: onFinish,
  } = useBookNowForm();

  return (
    <div className="w-full rounded-xl border-2 border-solid border-[var(--primary-color)] px-4 py-3 lg:px-8 lg:py-6">
      <h2 className="text-2xl font-medium mb-4">Book now</h2>
      <Form id={ELM_ID.BOOK_NOW_FORM} layout="vertical" initialValues={FORM_INITIAL_VALUES} onFinish={onFinish}>
        <FormItem hidden name="eventId" initialValue={eventId} />
        <FormItem className="highlight" name="type" label="Ticket type">
          <RadioGroup buttonStyle="solid" id={ELM_ID.TICKET_TYPE}>
            <RadioButton value={TicketType.GeneralAdmission}>General Admission</RadioButton>
            <RadioButton value={TicketType.EarlyBird}>Early bird</RadioButton>
            <RadioButton value={TicketType.VIP}>VIP</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem className="highlight" label="Attendee information">
          <div className="flex flex-col md:flex-row md:gap-6 w-full" id={ELM_ID.ATTENDEE}>
            <FormItem
              className="w-full"
              name="fullName"
              label="Full name"
              layout="horizontal"
              rules={[{ required: true }]}
            >
              <Input placeholder="Input your full name" />
            </FormItem>
            <FormItem
              className="w-full"
              name="email"
              label="Email"
              layout="horizontal"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="Input your email" />
            </FormItem>
          </div>
        </FormItem>
        <Button type="primary" size="large" htmlType="submit" id={ELM_ID.BOOK_NOW_BTN}>
          Book now
        </Button>
        <Tour open={tourOpen} onClose={closeTour} steps={tourSteps} />
        <Modal title={null} footer={null} width={800} open={isOpenSuccessModal} onCancel={closeSuccessModal}>
          <Result
            status="success"
            title="Your booking has been confirmed"
            subTitle={
              <span>
                Your booking ID is&nbsp;
                <Typography.Text strong copyable>
                  {successVals?.bookingId}
                </Typography.Text>
                . We will send you an email with the ticket information.
              </span>
            }
            extra={[
              <Button key="explore-btn" type="primary" onClick={() => router.push("/events")}>
                Explore more upcoming events
              </Button>,
              <Button key="close-btn" onClick={closeSuccessModal}>
                Close
              </Button>,
            ]}
          />
        </Modal>
      </Form>
    </div>
  );
};

export default BookNowForm;
