import { auth } from "../_lib/auth";
import { getBookedDates, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates, session] = await Promise.all([
    getSettings(),
    getBookedDates(cabin.id),
    auth(),
  ]);

  const isLoggedIn = session?.user;

  return (
    <div className="grid grid-cols-[auto_auto] border border-primary-800 min-h-[100px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {isLoggedIn ? (
        <ReservationForm
          maxCapacity={cabin?.maxCapacity}
          user={session?.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
export default Reservation;
