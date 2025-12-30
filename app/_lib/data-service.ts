import { supabase } from "@/app/_lib/supabse";
import { notFound } from "next/navigation";

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    if (!res.ok) throw new Error("Could not fetch rest countries-api data");
    const data:
      | { name: string; flag: string; indpendent: boolean }[]
      | undefined = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCabins() {
  try {
    const { data, error } = await supabase
      .from("the_oasis_cabins")
      .select("id, name, maxCapacity, regularPrice, discount, image")
      .order("name");
    if (error) throw new Error("Could not get cabins data");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCabinData(id) {
  try {
    const { data, error } = await supabase
      .from("the_oasis_cabins")
      .select(
        "id, name, maxCapacity, regularPrice, discount, image, description",
      )
      .eq("id", id)
      .single();
    if (error) throw new Error(`Could not load cabin data with id-${id}`);
    return data;
  } catch (error) {
    console.error(error);
    notFound(); //NOTE: how to manually forward to not-found page
  }
}
