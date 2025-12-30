import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Page() {
  const nationality = "india";
  const countryFlag = "in.jpg";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <UpdateProfileForm>
        {/*using server component inside a client component as Update Profile is a client component passing SelectCountry as children is the only way*/}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
    </div>
  );
}
