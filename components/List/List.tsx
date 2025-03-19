import Link from 'next/link';
import React from 'react';

export interface NavigationListEntry {
  slug: string;
  name: string;
}
interface NavigationListProps {
  rootSlug: string;
  list: NavigationListEntry[];
}

const NavigationList = ({ list, rootSlug }: NavigationListProps) => {
  return (
    <ul>
      {list.map((listItem) => {
        const href = `/${rootSlug}/${listItem.slug}`;
        return (
          <li key={listItem.name}>
            <Link href={href}>{listItem.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationList;
