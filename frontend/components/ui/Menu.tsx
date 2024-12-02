"use client"
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Menu() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const baseClasses = "hover:text-white";
    return pathname === href ? `${baseClasses} text-yellow-300 underline` : baseClasses;
  };
  return (
    <>
      <nav className="space-x-4">
        <Link href="/create" className={getLinkClassName("/create")}>Create</Link>
        <Link href="/explore" className={getLinkClassName("/explore")}>Explore</Link> 
        <Link href="/faucet" className={getLinkClassName("/faucet")}>Faucet</Link>
        {/* <a href="https://faucet.ethena.fi/" target="_blank">Faucet</a> */}
        <Link href ="#" className={getLinkClassName("#")}>Docs</Link>
        <Link href="/profile" className={getLinkClassName("/profile")}>Profile</Link>
      </nav>
      <ConnectKitButton />
    </>
  );
}