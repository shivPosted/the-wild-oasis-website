import DateSelector from "@/app/_components/DateSelector";
import Reservation from "@/app/_components/Reservation";
import ReservationForm from "@/app/_components/ReservationForm";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {
  getBookedDates,
  getCabinData,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: string };
}): Promise<Metadata> {
  const { name } = await getCabinData(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

//NOTE: for static route genreation using generateStaticParams for converting finite set of routes/ids to static routes
export async function generateStaticParams() {
  //this function returns an array of objects with same parmas keyname and value--> string the object

  const cabins = await getCabins();
  const ids = cabins?.map((cabin) => ({ cabinId: String(cabin.id) })); //value should be string
  return ids;
}

export default async function Page({ params }: { params: Params }) {
  const cabin = await getCabinData(params.cabinId);
  await getCabinData(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={cabin?.image}
            fill
            className="object-cover"
            alt={`Cabin ${cabin?.name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {cabin?.name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{cabin?.description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to{" "}
                <span className="font-bold">{cabin?.maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-500 mb-8">
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
