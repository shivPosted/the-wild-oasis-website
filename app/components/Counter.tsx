"use client";

import { ComponentPropsWithoutRef, useState } from "react";

type CounterPropsType = ComponentPropsWithoutRef<"div"> & {
  users: object[];
};

function Counter({ users }: CounterPropsType) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users.</p>
      <button onClick={() => setCount((cur) => cur + 1)}>{count}</button>
    </div>
  );
}
export default Counter;
