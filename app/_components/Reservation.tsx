import { getBookedDates, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDates(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-[auto_auto] border border-primary-800 min-h-[100px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      <ReservationForm maxCapacity={cabin?.maxCapacity} />
    </div>
  );
}
export default Reservation;
