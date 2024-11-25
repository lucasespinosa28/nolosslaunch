import Link from "next/link";

export default function Menu() {
  return (
    <>
      <nav className="space-x-4">
        <Link href="/create" className="hover:text-white">Create</Link>
        <Link href="/explore" className="hover:text-white">Explore</Link>
        <Link href="#" className="hover:text-white">Docs</Link>
      </nav>
      <Link href="/profile" className="bg-indigo-400 text-black px-4 py-2 rounded hover:bg-indigo-300">Profile</Link>
      <button className="bg-indigo-400 text-black px-4 py-2 rounded hover:bg-indigo-300">Connect</button>
    </>
  );
}