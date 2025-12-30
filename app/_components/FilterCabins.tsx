"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

function FilterCabins() {
  const searchParams = useSearchParams();
  const router = useRouter(); //NOTE:from next/navigation and not next/router;
  const pathName = usePathname();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex ml-auto">
      <Button handleFilter={handleFilter} filter="all">
        All cabins
      </Button>
      <Button handleFilter={handleFilter} filter="small">
        1&mdash;3 guests
      </Button>
      <Button handleFilter={handleFilter} filter="medium">
        4&mdash;7 guests
      </Button>
      <Button handleFilter={handleFilter} filter="large">
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({
  children,
  handleFilter,
  filter,
}: {
  children: ReactNode;
  handleFilter: (filter: string) => void;
  filter: string;
}) {
  return (
    <button
      className="px-5 py-2 hover:bg-primary-700"
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default FilterCabins;
