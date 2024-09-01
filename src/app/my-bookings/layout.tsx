import { MyBookingProvider } from "./contexts/MyBookingContext";

const MyBookingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MyBookingProvider>{children}</MyBookingProvider>;
};

export default MyBookingsLayout;
