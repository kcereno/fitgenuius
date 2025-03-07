import { underscoreToDash } from '@/utils/formatters';
import Link from 'next/link';
import React from 'react';

interface ListItem {
  id: string;
  name: string;
}

interface ListProps<T> {
  rootSlug: string;
  list: T[];
}

const NavigationList = <T extends ListItem>({
  list,
  rootSlug,
}: ListProps<T>) => {
  return (
    <ul>
      {list.map((listItem: T) => {
        const href = `/${rootSlug}/${underscoreToDash(listItem.id)}`;
        return (
          <li key={listItem.id}>
            <Link href={href}>{listItem.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationList;
