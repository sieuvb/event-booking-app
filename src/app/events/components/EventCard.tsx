import { DATA_TIME_FORMAT, DISPLAY_DATE_FORMAT } from "@/common/constants";
import { Event } from "@/services/EventService";
import { ClockCircleOutlined, GlobalOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const EventCard: React.FC<Event> = (props) => {
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
  } = props;

  const displayTime = dayjs(`${startDate} ${startTime}`, DATA_TIME_FORMAT).format(DISPLAY_DATE_FORMAT);

  return (
    <Link
      className="block border-2 border-solid border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
      href={`/events/${id}`}
    >
      <Image width={208} height={160} className="block w-full h-40 md:h-52 object-cover" src={imageUrl} alt={name} />
      <ul className="flex flex-col gap-2 px-4 pb-4 mt-3">
        <li className="text-xl overflow-hidden overflow-ellipsis line-clamp-2">{name}</li>
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
        <li className="flex items-end h-14">
          <span>
            {isFree ? (
              <span className="text-2xl font-medium">Free</span>
            ) : (
              <>
                From <span className="text-2xl font-medium">{minDisplayPrice}</span>
              </>
            )}
          </span>
        </li>
      </ul>
    </Link>
  );
};

export default EventCard;
