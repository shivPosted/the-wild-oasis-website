import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import FilterCabins from "../_components/FilterCabins";

export const metadata = {
  title: "Cabins",
};

//NOTE:caching the entire cabins route to revalidate/refetch the data after 3600 seconds, we can also use noStore function for component level cache management
export const revalidate = 3600;

export default async function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex mb-4">
        <FilterCabins />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        {" "}
        {/*NOTE: suspense uses transition behind the scenes so we have to ue a unique key for it to work whenever that key changes the suspense will kick off again*/}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
