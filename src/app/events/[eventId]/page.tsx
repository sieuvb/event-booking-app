import dayjs from "dayjs";
import Image from "next/image";
import { ClockCircleOutlined, GlobalOutlined } from "@ant-design/icons";

import { DATA_TIME_FORMAT, DISPLAY_DATE_FORMAT } from "@/common/constants";
import { fetchEventDetail } from "@/services/EventService";
import BookNowButton from "./components/BookNowButton";
import BookNowForm from "./components/BookNowForm";
import { ELM_ID } from "./constants";

interface EventDetailPageProps {
  params: {
    eventId: string;
  };
}

// mock data
const loremParagraphs = Array.from({ length: 10 }).map((_, index) => (
  <p key={index}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at scelerisque nunc. Nullam in justo nec odio
    lacinia ultricies. Donec auctor, risus nec tincidunt luctus, nunc arcu ultricies libero, id fermentum tortor velit
    et mauris. Nulla facilisi. Nullam auctor tellus at odio tincidunt, et ultricies nisl ultrices. Nunc nec sollicitudin
    odio. Nulla facilisi. Donec auctor, risus nec tincidunt luctus, nunc arcu ultricies libero, id fermentum tortor
    velit et mauris. Nulla facilisi. Nullam auctor tellus at odio tincidunt, et ultricies nisl ultrices. Nunc nec
    sollicitudin odio. Nulla facilisi.
  </p>
));

const EventDetailPage = async ({ params: { eventId } }: EventDetailPageProps) => {
  const event = await fetchEventDetail({ id: eventId });
  const {
    name,
    start_date: startDate,
    start_time: startTime,
    image: {
      original: { url: imageUrl, width, height },
    },
    primary_venue: {
      address: { country },
    },
    ticket_availability: {
      is_free: isFree,
      minimum_ticket_price: { display: minDisplayPrice },
    },
  } = event;
  const displayTime = dayjs(`${startDate} ${startTime}`, DATA_TIME_FORMAT).format(DISPLAY_DATE_FORMAT);

  return (
    <article className="py-10">
      <Image
        width={width}
        height={height}
        className="block w-full h-[300px] lg:h-[400px] object-cover mb-10"
        src={imageUrl}
        alt={name}
      />
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_200px] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{name}</h1>
          <ul className="flex flex-col lg:flex-row lg:gap-10 mb-4 text-xl">
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
          </ul>
          <div className="flex flex-col gap-4 leading-6 mb-6">{loremParagraphs}</div>
          <BookNowForm eventId={eventId} />
        </div>
        <div
          id={ELM_ID.FLOATING_BOOK_NOW_BTN}
          className="sticky bottom-0 z-20 md:top-28 h-fit rounded-xl border-2 border-solid border-[var(--primary-color)] bg-white md:px-6 md:py-4 px-8 py-6"
        >
          <div>
            {isFree ? (
              <span className="text-2xl font-medium">Free</span>
            ) : (
              <>
                From <span className="text-2xl font-medium">{minDisplayPrice}</span>
              </>
            )}
          </div>
          <BookNowButton />
        </div>
      </div>
    </article>
  );
};

export default EventDetailPage;
