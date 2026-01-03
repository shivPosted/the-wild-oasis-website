import Link from "next/link";

async function Guest({ user }) {
  const isLoggedIn = Boolean(user?.name);

  return isLoggedIn ? (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors flex items-center gap-4"
    >
      <img
        src={user?.image}
        alt={`${user?.name}-image`}
        className="size-8 rounded-full"
        referrerPolicy="no-referrer"
      />
      <span>{user?.name}</span>
    </Link>
  ) : (
    <Link href="/account" className="hover:text-accent-400 transition-colors">
      Guest area
    </Link>
  );
}

export default Guest;
