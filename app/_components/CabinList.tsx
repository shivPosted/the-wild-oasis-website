import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList() {
  const cabins = await getCabins();
  if (cabins && cabins.length < 0) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins?.map((cabin) => <CabinCard cabin={cabin} key={cabin.id} />)}
    </div>
  );
}
import { unstable_noStore } from "next/cache";
export default CabinList;
