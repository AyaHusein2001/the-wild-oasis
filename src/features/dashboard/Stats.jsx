import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays,cabinCount }) => {
  // Stat 1)
  const numBookings = bookings.length;

  // Stat 2)
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // stat 3)
  const checkins = confirmedStays.length;

  // stat 4)
  //num checkedInNights / all available nights(numDays*numCabins => num of days that we could have sold)
  const occupation = confirmedStays.reduce(
    (acc, stay) => acc + stay.numNights,
    0
  )/(numDays*cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
