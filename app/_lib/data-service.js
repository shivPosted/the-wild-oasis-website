import { supabase } from "@/app/_lib/supabse";

export async function getCountries() {
  return [];
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
