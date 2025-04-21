'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Fun Zone", href: "/fun" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) =>
    pathname === href
      ? "bg-[#3B82F6] text-white font-semibold h-full flex items-center px-6"
      : "text-white hover:bg-[#1E40AF] hover:text-white h-full flex items-center px-6 transition-all";

  return (
    <nav className="bg-[#0D0D0D] shadow-lg sticky top-0 z-50 h-14 flex justify-between items-stretch text-lg font-semibold">
      <div className="flex">
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
      </div>
      <div className="flex">
        {navItems.slice(1).map(({ label, href }) => (
          <Link key={href} href={href} className={isActive(href)}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}





/*
Theme	Background Color
Neon Matrix	bg-[#0D0D0D]
Orange Burn	bg-[#0D0D0D]
Minimal Gray	bg-[#0D0D0D]

Theme	Active Tab
Neon Matrix	bg-[#00FFAA] text-black
Orange Burn	bg-[#FF6B00] text-black
Minimal Gray	bg-[#3B82F6] text-white

Theme	Hover Classes
Neon Matrix	hover:bg-[#007F66] hover:text-white
Orange Burn	hover:bg-[#FF914D] hover:text-white
Minimal Gray	hover:bg-[#1E40AF] hover:text-white
*/