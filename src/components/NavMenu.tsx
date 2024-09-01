import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="w-full border-b-2 border-gray-400 border-solid sticky top-0 bg-white z-50">
      <ul className="fit-w-screen flex justify-between items-center w-full py-6">
        <li className="text-[var(--primary-color)] font-light text-4xl font-cinzel">
          <Link href="/">
            Events <span className="bg-[var(--primary-color)] text-white px-4 leading-[1.3] inline-block">Booking</span>
          </Link>
        </li>
        <li>
          <Tooltip title="My Bookings">
            <Link href="/my-bookings">
              <UserOutlined className="text-3xl" />
            </Link>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
