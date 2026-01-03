import { supabase } from "@/app/_lib/supabse";
import { notFound } from "next/navigation";
import Error from "../error";

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

export async function getBookedDates(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  try {
    const { data, error } = await supabase
      .from("the_oasis_bookings")
      .select("*")
      .eq("cabinId", cabinId)
      .or(`startedAt.gte.${today.toISOString()},status.eq.checked-in`);

    if (error)
      throw new Error(`Could not get the booked dates for cabin-${cabinId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from("the_oasis_settings")
      .select("*")
      .single();
    if (error)
      throw new Error("Could not fetch the settings from the supabase table");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGuest(email) {
  try {
    const { data, error } = await supabase
      .from("the_oasis_guests")
      .select("*")
      .eq("email", email)
      .single();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createGuest(newGuest) {
  try {
    const { error } = await supabase
      .from("the_oasis_guests")
      .insert([{ ...newGuest }]);
    if (error) throw new Error("Could not create that user");
  } catch (error) {
    console.error(error);
  }
}
