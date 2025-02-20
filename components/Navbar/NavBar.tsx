import React from 'react';
import { Dumbbell, ClipboardList, Ellipsis, House } from 'lucide-react';
import Link from 'next/link';

const NavLinks = [
  {
    icon: House,
    href: '/',
  },
  {
    icon: ClipboardList,
    href: '/workouts',
  },
  {
    icon: Dumbbell,
    href: '/exercises',
  },
  {
    icon: Ellipsis,
    href: '/options',
  },
];

const NavBar = () => {
  return (
    <nav className="h-14 bg-gray-300 fixed bottom-0 left-0 w-full flex justify-around items-center">
      {NavLinks.map(({ href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="p-2"
        >
          <Icon className="size-6" />
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
