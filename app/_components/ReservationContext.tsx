"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  range: {
    from: undefined,
    to: undefined,
  },
};
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState.range);

  function resetRange() {
    setRange(initialState.range);
  }
  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context: {
    range: { from: undefined | Date; to: undefined | Date };
    setRange: () => void;
    resetRange: () => void;
  } = useContext(ReservationContext);
  if (context === undefined) throw new Error("Using context out of its scope");
  return context;
}

export { ReservationProvider, useReservation };
