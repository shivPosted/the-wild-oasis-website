import { supabase } from "@/app/_lib/supabse";

export async function getCountries() {
  return [];
}

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("the_oasis_cabins").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
  }
}
